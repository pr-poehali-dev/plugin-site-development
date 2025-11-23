import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { guide } from './contractsData';

const GuideSection = () => {
  return (
    <Card className="p-4 sm:p-5 md:p-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
        <Icon name="BookOpen" size={20} className="text-primary sm:w-6 sm:h-6 md:w-7 md:h-7" />
        Руководство по Solidity
      </h2>
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {guide.map((section, index) => (
          <div key={index} className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary">{section.title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{section.content}</p>
            <ul className="space-y-1.5 sm:space-y-2 ml-3 sm:ml-4">
              {section.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                  <Icon name="ChevronRight" size={14} className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GuideSection;
