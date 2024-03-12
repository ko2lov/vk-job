export const FILTER_FIELDS = {
  CLOSED: 'closed',
  FRIENDS: 'friends',
  AVATAR_COLOR: 'avatar_color',
}

export const DEFAULT_FILTER = {
  [FILTER_FIELDS.CLOSED]: 'all',
  [FILTER_FIELDS.FRIENDS]: 'all',
  [FILTER_FIELDS.AVATAR_COLOR]: 'all',
}

export const ACTIVE_PANEL = {
  LIST: 'list',
  GROUP: 'group'
}

export const OPTION_VALUES = {
  ALL: 'all',
  INCLUDES: 'true',
  NOT_INCLUDES: 'false',
}

export const PRIVATES_OPTIONS = [
  { name: 'Все', value: OPTION_VALUES.ALL },
  { name: 'Открытые', value: OPTION_VALUES.INCLUDES },
  { name: 'Закрытые', value: OPTION_VALUES.NOT_INCLUDES },
]

export const FRIENDS_OPTIONS = [
  { name: 'Все', value: OPTION_VALUES.ALL },
  { name: 'Есть Друзья', value: OPTION_VALUES.INCLUDES },
  { name: 'Нет Друзей', value: OPTION_VALUES.NOT_INCLUDES },
]

export const COLOR_OPTIONS = [
  { name: 'Все', value: OPTION_VALUES.ALL },
  { name: 'Нет цвета', value: OPTION_VALUES.NOT_INCLUDES },
]

