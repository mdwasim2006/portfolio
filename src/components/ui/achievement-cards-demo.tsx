import { motion } from 'framer-motion';
import {
  Braces,
  Code2,
  Database,
  Globe,
  Lock,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { AwardCard } from './achievement-cards';

const skillsData = [
  {
    icon: <Code2 className="h-8 w-8 text-indigo-300" />,
    title: 'Frontend',
    description: 'React',
  },
  {
    icon: <Braces className="h-8 w-8 text-sky-300" />,
    title: 'Programming',
    description: 'JavaScript / TypeScript',
  },
  {
    icon: <Server className="h-8 w-8 text-emerald-300" />,
    title: 'Backend',
    description: 'Node.js / Flask',
  },
  {
    icon: <Database className="h-8 w-8 text-amber-300" />,
    title: 'Data',
    description: 'SQL / MongoDB',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-rose-300" />,
    title: 'Security',
    description: 'App Security Basics',
  },
  {
    icon: <Lock className="h-8 w-8 text-cyan-300" />,
    title: 'Auth',
    description: 'JWT / Session Management',
  },
  {
    icon: <Workflow className="h-8 w-8 text-violet-300" />,
    title: 'Automation',
    description: 'Workflow Systems',
  },
  {
    icon: <Globe className="h-8 w-8 text-lime-300" />,
    title: 'Deployment',
    description: 'Modern Web Delivery',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
    },
  },
};

export default function AwardCardGridDemo() {
  return (
    <div className="w-full max-w-6xl p-1" aria-label="Skills and Capabilities">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        role="list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {skillsData.map((skill) => (
          <motion.div key={`${skill.title}-${skill.description}`} variants={itemVariants} role="listitem" className="h-full">
            <AwardCard
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
