import '@emotion/react';
import type { Theme as AppTheme } from '@/interfaces';
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

/**
 * Module augmentation для @emotion/react.
 *
 * По умолчанию тип `Theme`, который emotion передаёт в styled-компоненты
 * через параметр { theme }, — пустой интерфейс. Он не знает о нашей
 * кастомной теме из ./theme.ts.
 *
 * Здесь мы "дополняем" (declaration merging) встроенный тип Theme,
 * подставляя туда форму нашей реальной темы. После этого TypeScript
 * будет знать все поля theme.colors, theme.spacing и т.д. в любом
 * styled.xxx`...` по всему проекту.
 *
 */
