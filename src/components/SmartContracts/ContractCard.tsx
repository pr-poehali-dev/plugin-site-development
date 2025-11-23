import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Contract } from './contractsData';

interface ContractCardProps {
  contract: Contract;
  canViewFullCode: boolean;
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
  onShowVipDialog: () => void;
  processCode: (code: string, contractId: string) => string;
}

const ContractCard = ({ 
  contract, 
  canViewFullCode, 
  copiedCode, 
  onCopy, 
  onShowVipDialog,
  processCode 
}: ContractCardProps) => {
  return (
    <Card className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">{contract.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">{contract.description}</p>
          <span className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
            contract.difficulty === 'Начальный' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-orange-500/20 text-orange-400'
          }`}>
            {contract.difficulty}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCopy(processCode(contract.code, contract.id), contract.id)}
          className="gap-1.5 sm:gap-2 w-full sm:w-auto text-xs sm:text-sm"
          disabled={contract.id === 'flash-usdt' && !canViewFullCode}
        >
          <Icon name={copiedCode === contract.id ? "Check" : contract.id === 'flash-usdt' && !canViewFullCode ? "Lock" : "Copy"} size={14} className="sm:w-4 sm:h-4" />
          {copiedCode === contract.id ? 'Скопировано' : contract.id === 'flash-usdt' && !canViewFullCode ? 'Ограничено' : 'Копировать'}
        </Button>
      </div>

      <div className="relative w-full overflow-hidden">
        {contract.id === 'flash-usdt' && !canViewFullCode && (
          <div className="mb-3 p-3 sm:p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl">
            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Icon name="Lock" size={20} className="text-orange-400 flex-shrink-0 mt-0.5 sm:w-6 sm:h-6" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-orange-400 mb-1 text-sm sm:text-base">🔒 Ограниченный доступ</p>
                <p className="text-muted-foreground text-xs sm:text-sm">Некоторые критические части кода скрыты.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-orange-500/20">
              <p className="text-xs sm:text-sm text-muted-foreground flex-1">
                Для полного просмотра кода <span className="font-semibold text-amber-400">приобретите привилегию VIP</span>
              </p>
              <Button
                size="sm"
                onClick={onShowVipDialog}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs sm:text-sm w-full sm:w-auto whitespace-nowrap"
              >
                <Icon name="Crown" size={14} className="mr-1.5 sm:w-4 sm:h-4" />
                Купить VIP
              </Button>
            </div>
          </div>
        )}

        <div className="bg-secondary/50 rounded-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <pre className="p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed">
              <code className="font-mono whitespace-pre">
                {processCode(contract.code, contract.id)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContractCard;
