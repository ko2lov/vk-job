import {
  View,
  PanelHeader,
  Panel,
  Group,
  SimpleCell,
  Header,
  Avatar,
  Placeholder,
  PanelHeaderBack,
  NativeSelect,
  Cell
} from "@vkontakte/vkui";
import { useState } from "react";
const ListCoop = ({ data }) => {
  const [filter, setFilter] = useState({
    closed: "all",
    friends: "all",
    avatar_color: "all"
  });

  const [activePanel, setActivePanel] = useState("list");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const uniqueColors = [...new Set(data.map(group => group.avatar_color))].filter(Boolean);

  const filterGroups = () => {
    return data.filter(group => (filter.closed === "all" || group.closed.toString() === filter.closed) &&
    (filter.friends === "all" || (group.friends ? group.friends.length > 0 : false).toString() === filter.friends) &&
    (filter.avatar_color === "all" || (group.avatar_color || "no-avatar") === filter.avatar_color));
  };
  const filteredGroups = filterGroups();
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setActivePanel('group');
  };



  const onChange = (field) => (e) => {
    setFilter({
      closed: "all",
      friends: "all",
      avatar_color: "all",
      [field]: e.target.value,
    });
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="list">
        <PanelHeader>Группы</PanelHeader>

        <NativeSelect top="Тип приватности" onChange={onChange("closed")}>
          <option value="all">Все</option>
          <option value="true">Закрытые</option>
          <option value="false">Открытые</option>
        </NativeSelect>

        <NativeSelect
          top="Друзья"
          onChange={onChange("friends")}
        >
          <option value="all">Все</option>
          <option value="true">Есть Друзья</option>
          <option value="false">Нет Друзей</option>
        </NativeSelect>

        <NativeSelect
          top="Цвет"
          onChange={onChange("avatar_color")}
        >
          <option value="all">Все</option>
          <option value="no-avatar">Нет цвета</option>
          {
            uniqueColors.map((color) => {

              return <option value={color}>{color}</option>
            })
          }

        </NativeSelect>

        <Group header={<Header mode="secondary">Список групп</Header>}>
          {filteredGroups.map((item, index) => {
            return (
              <SimpleCell
                onClick={() => handleGroupClick(item)}
                before={
                  <Avatar
                    size={100}
                    style={{background: `${item?.avatar_color ? item.avatar_color : "black"}`, color: "grey"}}
                    initials={item.name[0]}
                  />
                }
                after={item.friends ? `${item.friends.length} друзей` : ""}
                subtitle={`${item.members_count + " подписчиков "} ${
                  item.closed ? "закрытая" : "открытая"
                }`}
                expandable="auto"
              >
                {item.name}
              </SimpleCell>
            );
          })}
        </Group>
      </Panel>
    
      <Panel id="group">
        <PanelHeader
          before={<PanelHeaderBack onClick={() => setActivePanel("list")} />}
        >
          {selectedGroup?.name}
        </PanelHeader>
        {selectedGroup?.friends?.length ? (
          <Group header={<Header mode="secondary">Друзья</Header>}>
            {selectedGroup.friends.map((friend) => (
              <Cell key={friend.first_name + friend.last_name}>
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