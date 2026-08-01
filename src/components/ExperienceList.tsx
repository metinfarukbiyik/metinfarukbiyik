import React from 'react';
import { experiences } from '../data/cvData';
import ListRow, { Bullets } from './ui/ListRow';
import { Building2 } from 'lucide-react';

const ExperienceList: React.FC = () => (
  <>
    {experiences
      .slice()
      .reverse()
      .map((exp, index) => (
        <ListRow
          key={index}
          icon={Building2}
          iconColor="bg-accent"
          title={exp.company}
          subtitle={exp.role}
          trailing={
            <span className="text-[12.5px] font-medium text-label-tertiary">{exp.period}</span>
          }
        >
          <Bullets items={exp.responsibilities} />
        </ListRow>
      ))}
  </>
);

export default ExperienceList;
