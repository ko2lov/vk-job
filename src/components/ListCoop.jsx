import React, { useMemo, useState } from "react";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  Header,
  SimpleCell,
  Avatar,
  Placeholder,
  PanelHeaderBack,
  NativeSelect,
  Cell,
} from "@vkontakte/vkui";
import { ACTIVE_PANEL, COLOR_OPTIONS, DEFAULT_FILTER, FILTER_FIELDS, FRIENDS_OPTIONS, OPTION_VALUES, PRIVATES_OPTIONS } from "../constants";

const ListCoop = ({ data }) => {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [activePanel, setActivePanel] = useState(ACTIVE_PANEL.LIST);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const uniqueColors = useMemo(() => [...new Set(data.map((group) => group.avatar_color))].filter(Boolean), [data]);

  const filteredGroups = useMemo(() => data.filter((group) => {
    const isClosedMatch = filter.closed === OPTION_VALUES.ALL || group.closed.toString() === filter.closed;
    const isFriendsMatch = filter.friends === OPTION_VALUES.ALL || (group.friends ? group.friends.length > 0 : false).toString() === filter.friends;
    const isAvatarColorMatch = filter.avatar_color === OPTION_VALUES.ALL || (group.avatar_color || OPTION_VALUES.NOT_INCLUDES) === filter.avatar_color;

    return isClosedMatch && isFriendsMatch && isAvatarColorMatch;
  }), [data, filter]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setActivePanel(ACTIVE_PANEL.GROUP);
  };

  const handleChange = (e, field) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="list">
        <PanelHeader>Группы</PanelHeader>
        <NativeSelect top="Тип приватности" value={filter.closed} onChange={(e) => handleChange(e, FILTER_FIELDS.CLOSED)}>
          {
            PRIVATES_OPTIONS.map(color => <option key={color.value} value={color.value}>{color.name}</option>)
          }
        </NativeSelect>
        <NativeSelect top="Друзья" value={filter.friends} onChange={(e) => handleChange(e, FILTER_FIELDS.FRIENDS)} >
          {
            FRIENDS_OPTIONS.map(color => <option key={color.value} value={color.value}>{color.name}</option>)
          }
        </NativeSelect>
        <NativeSelect top="Цвет" value={filter.avatar_color} onChange={(e) => handleChange(e, FILTER_FIELDS.AVATAR_COLOR)}>
          {
            COLOR_OPTIONS.map(color => <option key={color.value} value={color.value}>{color.name}</option>)
          }
          {uniqueColors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </NativeSelect>

        <Group header={<Header mode="secondary">Список групп</Header>}>
          {filteredGroups.map((item) => (
            <SimpleCell
              key={item.id}
              onClick={() => handleGroupClick(item)}
              before={<Avatar size={100} style={{ background: item.avatar_color || "black", color: "grey" }} initials={item.name[0]} />}
              after={item.friends ? `${item.friends.length} друзей` : ""}
              subtitle={`${item.members_count} подписчиков ${item.closed ? "закрытая" : "открытая"}`}
              expandable="auto"
            >
              {item.name}
            </SimpleCell>
          ))}
        </Group>
      </Panel>

      <Panel id="group">
        <PanelHeader
          before={<PanelHeaderBack onClick={() => setActivePanel(ACTIVE_PANEL.LIST)} />}
        >
          {selectedGroup?.name}
        </PanelHeader>
        {selectedGroup?.friends?.length ? (
          <Group header={<Header mode="secondary">Друзья</Header>}>
            {selectedGroup.friends.map((friend) => (
              <Cell key={friend.id}>
                {friend.first_name} {friend.last_name}
              </Cell>
            ))}
          </Group>
        ) : (
          <Placeholder>В этом сообществе нет друзей.</Placeholder>
        )}
      </Panel>
    </View>
  );
};

export default ListCoop;
