export type ModelYVariant = 'standard' | 'premium' | 'long_wheelbase' | 'performance';

export type ModelYFilm = {
  id: string;
  title: string;
  subtitle: string;
  src: string;
};

export const MODEL_Y_FILMS: Record<ModelYVariant, ModelYFilm[]> = {
  standard: [
    {
      id: 'connected',
      title: 'Connected',
      subtitle: 'Seamless technology, thoughtfully integrated.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951501/Model-Y-Standard-Connected-Desktop-NA.webm',
    },
    {
      id: 'everything',
      title: 'Everything',
      subtitle: 'Versatility for the everyday.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951499/Model-Y-Standard-Everything-Desktop-NA.webm',
    },
    {
      id: 'more',
      title: 'More',
      subtitle: 'Room to make more of every journey.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951499/Model-Y-Standard-More-Desktop-NA.webm',
    },
  ],
  long_wheelbase: [
    {
      id: 'sleek',
      title: 'Sleek',
      subtitle: 'A refined silhouette with room to spare.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951563/Model-Y-L-Sleek-Desktop.webm',
    },
    {
      id: 'hyper',
      title: 'Hyper',
      subtitle: 'Space and capability for the long way around.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951561/Model-Y-L-Hyper-Desktop.webm',
    },
  ],
  performance: [
    {
      id: 'refined',
      title: 'Refined',
      subtitle: 'Performance, with precision in every detail.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951727/Model-Y-Performance-Refined-Desktop-NA.webm',
    },
    {
      id: 'adrenaline',
      title: 'Adrenaline',
      subtitle: 'An electric drive with a sharper edge.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951726/Model-Y-Performance-Adrenaline-Desktop-NA-EU-AU-NZ.webm',
    },
    {
      id: 'interior',
      title: 'Interior',
      subtitle: 'A driver-focused space, considered from every angle.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951725/Model-Y-Performance-Interior-Desktop-NA.webm',
    },
  ],
  premium: [
    {
      id: 'storage',
      title: 'Storage',
      subtitle: 'Flexible space for everyday plans and bigger ones.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951833/Model-Y-Premium-Storage-Desktop-NA-7-Seater.webm',
    },
    {
      id: 'comfort',
      title: 'Comfort',
      subtitle: 'A calmer, more considered way to travel.',
      src: 'https://res.cloudinary.com/i10zdpsr/video/upload/v1792951823/Model-Y-Premium-Comfort-Desktop-NA.webm',
    },
  ],
};
