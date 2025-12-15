import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { contracts } from './SmartContracts/contractsData';
import GuideSection from './SmartContracts/GuideSection';
import ContractCard from './SmartContracts/ContractCard';
import VipTonPurchase from '@/components/VipTonPurchase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SmartContractsPageProps {
  user?: User | null;
  onShowAuthDialog?: () => void;
}

const SmartContractsPage = ({ user, onShowAuthDialog }: SmartContractsPageProps) => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showVipDialog, setShowVipDialog] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  const hasActiveVip = user?.vip_until && new Date(user.vip_until) > new Date();
  const hasHighForumRole = user?.forum_role && ['vip', 'legend', 'moderator', 'admin'].includes(user.forum_role);
  const canViewFullCode = isAdmin || hasActiveVip || hasHighForumRole;

  const obfuscateLine = (line: string): string => {
    const criticalKeywords = [
      'flashFee',
      'FEE_DENOMINATOR',
      'flashMint',
      'flashExpiry',
      '_burnFlash',
      'isFlashToken',
      'FlashUSDT {',
      'string public name = "Flash USDT"',
      'string public symbol = "FUSDT"',
      '_initialSupply * 10 **',
      '1000, "Fee too high"',
      'event FlashMint(address indexed to, uint256 amount, uint256 expiry)'
    ];
    
    const hasCriticalKeyword = criticalKeywords.some(keyword => line.includes(keyword));
    
    if (hasCriticalKeyword && !canViewFullCode) {
      const indent = line.match(/^\s*/)?.[0] || '';
      return indent + '████████████████████████████████████';
    }
    
    return line;
  };

  const processCode = (code: string, contractId: string): string => {
    if (contractId !== 'flash-usdt' || canViewFullCode) {
      return code;
    }
    
    const lines = code.split('\n');
    return lines.map(obfuscateLine).join('\n');
  };

  const handleBuyVip = () => {
    if (!user && onShowAuthDialog) {
      onShowAuthDialog();
      return;
    }
    setShowVipDialog(true);
  };

  const copyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon name="FileCode" size={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Смарт-контракты Solidity</h1>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
                Полное руководство и готовые примеры для разработки
              </p>
            </div>
          </div>
        </div>
      </div>

      <GuideSection />

      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
          <Icon name="Code" size={20} className="text-primary sm:w-6 sm:h-6 md:w-7 md:h-7" />
          Примеры контрактов
        </h2>
        <div className="grid gap-4 sm:gap-5 md:gap-6">
          {contracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              canViewFullCode={canViewFullCode}
              copiedCode={copiedCode}
              onCopy={copyCode}
              onShowVipDialog={handleBuyVip}
              processCode={processCode}
            />
          ))}
        </div>
      </div>

      <Dialog open={showVipDialog} onOpenChange={setShowVipDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Покупка VIP статуса</DialogTitle>
          </DialogHeader>
          <VipTonPurchase user={user || null} onShowAuthDialog={onShowAuthDialog || (() => {})} />
        </DialogContent>
      </Dialog>

      <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl sm:rounded-2xl">
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
          <Icon name="BookMarked" size={20} className="text-primary sm:w-6 sm:h-6" />
          Полезные ресурсы
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {[
            { name: 'Документация Solidity', url: 'https://docs.soliditylang.org/' },
            { name: 'OpenZeppelin Contracts', url: 'https://docs.openzeppelin.com/contracts/' },
            { name: 'Remix IDE', url: 'https://remix.ethereum.org/' },
            { name: 'Etherscan', url: 'https://etherscan.io/' }
          ].map((resource, idx) => (
            <li key={idx}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs sm:text-sm md:text-base"
              >
                <Icon name="ExternalLink" size={14} className="sm:w-4 sm:h-4" />
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmartContractsPage;