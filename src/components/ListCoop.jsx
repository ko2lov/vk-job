import React, { useState } from "react";
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

const ListCoop = ({ data }) => {
  const [filter, setFilter] = useState({
    closed: "all",
    friends: "all",
    avatar_color: "all",
  });

  const [activePanel, setActivePanel] = useState("list");
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  const uniqueColors = [...new Set(data.map((group) => group.avatar_color))].filter(Boolean);

  const filterGroups = () => {
    return data.filter((group) => {
      const isClosedMatch = filter.closed === "all" || group.closed.toString() === filter.closed;
      const isFriendsMatch = filter.friends === "all" || (group.friends ? group.friends.length > 0 : false).toString() === filter.friends;
      const isAvatarColorMatch = filter.avatar_color === "all" || (group.avatar_color || "no-avatar") === filter.avatar_color;
      return isClosedMatch && isFriendsMatch && isAvatarColorMatch;
    });
  };

  const filteredGroups = filterGroups();

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setActivePanel("group");
  };

  const handleChange = (field) => (e) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="list">
        <PanelHeader>Группы</PanelHeader>

        <NativeSelect top="Тип приватности" value={filter.closed} onChange={handleChange("closed")}>
          <option value="all">Все</option>
          <option value="true">Закрытые</option>
          <option value="false">Открытые</option>
        </NativeSelect>

        <NativeSelect top="Друзья" value={filter.friends} onChange={handleChange("friends")}>
          <option value="all">Все</option>
          <option value="true">Есть Друзья</option>
          <option value="false">Нет Друзей</option>
        </NativeSelect>

        <NativeSelect top="Цвет" value={filter.avatar_color} onChange={handleChange("avatar_color")}>
          <option value="all">Все</option>
          <option value="no-avatar">Нет цвета</option>
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
          left={<PanelHeaderBack onClick={() => setActivePanel("list")} />}
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
