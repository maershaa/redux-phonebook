export const theme = Object.freeze({
  colors: {
    // Основные фоны
    background: {
      main: 'linear-gradient(180deg, #FFD5C4 0%, #C4B0FF 100%)', // Градиент фона страницы
      card: '#FFFFFF', // Фоновая карточка / контейнеры
      section: '#F7F2FF', // Секции внутри сайта
      transparent: 'rgba(255, 255, 255, 0.4)',
    },

    // Текст
    text: {
      primary: '#4f46e5', // Основной текст (темно-фиолетовый)
      secondary: '#7c6df0', // Второстепенный текст
      placeholder: '#B3A0CC', // Текст плейсхолдера
      white: '#FFFFFF',
    },

    // Акценты (кнопки, иконки)
    accent: {
      green: 'linear-gradient(145deg, #4CAF50CC, #4CAF50)',
      orange: 'linear-gradient(145deg, #feca57CC, #feca57)',
      red: 'linear-gradient(145deg, #ff6b6bCC, #ff6b6b)',
      blue: 'linear-gradient(135deg, #667eea 0%, #168a9c 100%)',
    },

    // Дополнительные декоративные элементы
    decorations: {
      star: '#FFE066',
      heart: '#FF6B81',
      paperPlane: '#FFFFFFCC',
      shadow: 'rgba(0, 0, 0, 0.05)',
    },

    // Цвета границ
    border: {
      light: '#E0D9F0', // Лёгкая граница для инпутов и карточек
      main: '#C4B0FF', // Акцентная граница
    },
  },

  // Тени, скругления, размеры
  shadows: {
    card: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    button: '0px 4px 8px rgba(0, 0, 0, 0.12)',
  },

  radii: {
    small: '6px',
    medium: '12px',
    large: '24px',
    round: '50%',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  fonts: {
    main: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
});
