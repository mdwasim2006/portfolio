import { ServiceCard } from './service-card';

const Demo = () => {
  const services = [
    {
      title: 'Gamification Marketing',
      href: '/services/gamification',
      imgSrc:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      imgAlt: 'Creative campaign concept board',
      variant: 'red',
    },
    {
      title: 'Graphic Design',
      href: '/services/design',
      imgSrc:
        'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=600&q=80',
      imgAlt: 'Designer desk with sketch materials',
      variant: 'default',
    },
    {
      title: 'Analytics and Tracking',
      href: '/services/analytics',
      imgSrc:
        'https://images.unsplash.com/photo-1551281044-8f3f4f0a5f8f?auto=format&fit=crop&w=600&q=80',
      imgAlt: 'Analytics dashboard on a monitor',
      variant: 'gray',
    },
    {
      title: 'Content Creation',
      href: '/services/content',
      imgSrc:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
      imgAlt: 'Writing and content creation workspace',
      variant: 'blue',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            href={service.href}
            imgSrc={service.imgSrc}
            imgAlt={service.imgAlt}
            variant={service.variant as 'red' | 'default' | 'gray' | 'blue'}
            className="min-h-[180px]"
          />
        ))}
      </div>
    </div>
  );
};

export default Demo;
