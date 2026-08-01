import React from 'react';
import { educations } from '../data/cvData';
import ListRow, { Bullets } from './ui/ListRow';
import { GraduationCap } from 'lucide-react';

const EducationList: React.FC = () => (
  <>
    {educations
      .slice()
      .reverse()
      .map((edu, index) => (
        <ListRow
          key={index}
          icon={GraduationCap}
          iconColor="bg-ios-indigo"
          title={edu.school}
          subtitle={edu.department}
          trailing={
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                {edu.level}
              </span>
              <span className="text-[12.5px] font-medium text-label-tertiary">{edu.period}</span>
            </div>
          }
        >
          <Bullets items={edu.details} />
        </ListRow>
      ))}
  </>
);

export default EducationList;
