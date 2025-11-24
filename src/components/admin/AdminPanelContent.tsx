import { User, ForumTopic, EscrowDeal } from '@/types';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminTopicsTab from '@/components/admin/AdminTopicsTab';
import AdminDisputesTab from '@/components/admin/AdminDisputesTab';
import AdminWithdrawalsTab from '@/components/admin/AdminWithdrawalsTab';
import AdminDepositsTab from '@/components/admin/AdminDepositsTab';
import AdminEscrowTab from '@/components/admin/AdminEscrowTab';
import AdminTicketsTab from '@/components/admin/AdminTicketsTab';
import AdminVerificationTab from '@/components/admin/AdminVerificationTab';
import AdminBtcWithdrawalsTab from '@/components/admin/AdminBtcWithdrawalsTab';

interface AdminPanelContentProps {
  activeTab: 'users' | 'topics' | 'disputes' | 'deposits' | 'withdrawals' | 'btc-withdrawals' | 'escrow' | 'flash-usdt' | 'tickets' | 'verification';
  users: User[];
  topics: ForumTopic[];
  disputes: EscrowDeal[];
  withdrawals: any[];
  deposits: any[];
  btcWithdrawals: any[];
  escrowDeals: EscrowDeal[];
  flashUsdtOrders: any[];
  tickets: any[];
  currentUser: User;
  onBlockUser: (userId: number, username: string) => void;
  onUnblockUser: (userId: number) => void;
  onDeleteUser: (userId: number, username: string) => void;
  onChangeForumRole: (userId: number, forumRole: string) => void;
  onEditTopic: (topic: ForumTopic) => void;
  onDeleteTopic: (topicId: number) => void;
  onUpdateViews: (topicId: number, views: number) => void;
  onRefreshWithdrawals: () => void;
  onRefreshDeposits: () => void;
  onRefreshBtcWithdrawals: () => void;
  onRefreshEscrow: () => void;
  onRefreshFlashUsdt: () => void;
  onRefreshTickets: () => void;
}

const AdminPanelContent = ({
  activeTab,
  users,
  topics,
  disputes,
  withdrawals,
  deposits,
  btcWithdrawals,
  escrowDeals,
  flashUsdtOrders,
  tickets,
  currentUser,
  onBlockUser,
  onUnblockUser,
  onDeleteUser,
  onChangeForumRole,
  onEditTopic,
  onDeleteTopic,
  onUpdateViews,
  onRefreshWithdrawals,
  onRefreshDeposits,
  onRefreshBtcWithdrawals,
  onRefreshEscrow,
  onRefreshFlashUsdt,
  onRefreshTickets
}: AdminPanelContentProps) => {
  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-3 sm:p-6 animate-fade-in">
      {activeTab === 'users' && (
        <AdminUsersTab 
          users={users}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onDeleteUser={onDeleteUser}
          onChangeForumRole={onChangeForumRole}
        />
      )}

      {activeTab === 'topics' && (
        <AdminTopicsTab 
          topics={topics}
          onEditTopic={onEditTopic}
          onDeleteTopic={onDeleteTopic}
          onUpdateViews={onUpdateViews}
        />
      )}

      {activeTab === 'disputes' && (
        <AdminDisputesTab 
          disputes={disputes}
          currentUser={currentUser}
        />
      )}

      {activeTab === 'withdrawals' && (
        <AdminWithdrawalsTab 
          withdrawals={withdrawals}
          currentUser={currentUser}
          onRefresh={onRefreshWithdrawals}
        />
      )}

      {activeTab === 'deposits' && (
        <AdminDepositsTab 
          deposits={deposits}
          currentUser={currentUser}
          onRefresh={onRefreshDeposits}
        />
      )}

      {activeTab === 'btc-withdrawals' && (
        <AdminBtcWithdrawalsTab 
          withdrawals={btcWithdrawals}
          currentUser={currentUser}
          onRefresh={onRefreshBtcWithdrawals}
        />
      )}

      {activeTab === 'escrow' && (
        <AdminEscrowTab 
          deals={escrowDeals}
          currentUser={currentUser}
          onRefresh={onRefreshEscrow}
        />
      )}

      {activeTab === 'flash-usdt' && (
        <div className="overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Заказы Flash USDT</h2>
          {flashUsdtOrders.length === 0 ? (
            <p className="text-muted-foreground">Нет заказов</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-xs sm:text-sm">ID</th>
                  <th className="text-left p-2 text-xs sm:text-sm">Пользователь</th>
                  <th className="text-left p-2 text-xs sm:text-sm">Сумма</th>
                  <th className="text-left p-2 text-xs sm:text-sm">Кошелек</th>
                  <th className="text-left p-2 text-xs sm:text-sm">Статус</th>
                  <th className="text-left p-2 text-xs sm:text-sm">Дата</th>
                </tr>
              </thead>
              <tbody>
                {flashUsdtOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-card/50">
                    <td className="p-2 text-xs sm:text-sm">#{order.id}</td>
                    <td className="p-2 text-xs sm:text-sm">{order.username}</td>
                    <td className="p-2 text-xs sm:text-sm font-semibold">{order.amount} USDT</td>
                    <td className="p-2 text-xs sm:text-sm font-mono text-xs">{order.wallet_address.slice(0, 8)}...</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-2 text-xs sm:text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'tickets' && (
        <AdminTicketsTab 
          tickets={tickets}
          currentUser={currentUser}
          onRefresh={onRefreshTickets}
        />
      )}

      {activeTab === 'verification' && (
        <AdminVerificationTab 
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default AdminPanelContent;
