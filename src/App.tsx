/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Zap, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Truck, 
  Check, 
  HelpCircle,
  Clock,
  Compass,
  ChevronsUpDown,
  LayoutDashboard,
  Route,
  Globe,
  Settings,
  X,
  Smartphone,
  CheckCircle,
  AlertOctagon,
  LogOut,
  Sliders,
  Maximize2,
  Bell
} from 'lucide-react';

import { DeliveryItem, OnboardingState } from './types';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import DashboardView from './components/DashboardView';
import RoutesView from './components/RoutesView';
import IntegrationsView from './components/IntegrationsView';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'onboarding' | 'dashboard' | 'routes' | 'integrations'>('landing');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [supportMessage, setSupportMessage] = useState<string>('');

  // Global Config variables updated during onboarding
  const [companyConfig, setCompanyConfig] = useState<OnboardingState>({
    currentStep: 'Empresa',
    companyName: 'Distribuidora Alves',
    segment: 'Alimentício',
    fleetSize: 12,
    integrationSelected: 'VTEX',
    firstRouteAdded: true
  });

  // Global deliveries database
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([
    { id: '#LP-49210', client: 'Moda Feminina BH', address: 'Av. Paulista, 1000', cep: '01310-100', status: 'Em rota', updatedAt: 'Há 4 mins', coordinates: { x: 65, y: 48 } },
    { id: '#LP-49208', client: 'Eletro Tech Curitiba', address: 'Rua XV de Novembro, 45', cep: '80020-310', status: 'Entregue', updatedAt: 'Há 12 mins', coordinates: { x: 45, y: 55 } },
    { id: '#LP-49207', client: 'Distribuidora Alvorada', address: 'Rua Augusta, 1200', cep: '01305-100', status: 'Falhou', updatedAt: 'Há 1 hora', coordinates: { x: 50, y: 56 } },
    { id: '#LP-49205', client: 'Pet Shop Amigo', address: 'Rua Tabapuã, 800', cep: '04533-014', status: 'Em rota', updatedAt: 'Há 2 horas', coordinates: { x: 32, y: 68 } }
  ]);

  // Toast notifier
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast_${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Complete onboarding wizard
  const handleOnboardingComplete = (data: Partial<OnboardingState>) => {
    setCompanyConfig(prev => ({
      ...prev,
      ...data
    }));
    addToast('Bem-vindo ao cockpit de produção!', 'success');
    setCurrentScreen('dashboard');
  };

  // Skip wizard directly to default sandbox (for demo)
  const handleEnterSandbox = () => {
    addToast('Entrando no ambiente de demonstração sandbox...', 'success');
    setCurrentScreen('dashboard');
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    addToast('Mensagem enviada com sucesso! Um especialista responderá em breve.', 'success');
    setSupportMessage('');
    setShowSupportModal(false);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] h-screen flex flex-col relative overflow-hidden">
      
      {/* Dynamic Toast Feedback Overlay Panel */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            let badgeBg = 'bg-blue-600 text-white';
            let icon = <CheckCircle className="h-4 w-4 shrink-0" />;

            if (toast.type === 'success') {
              badgeBg = 'bg-emerald-600 text-white';
              icon = <CheckCircle className="h-4 w-4 shrink-0" />;
            } else if (toast.type === 'error') {
              badgeBg = 'bg-red-600 text-white';
              icon = <AlertOctagon className="h-4 w-4 shrink-0" />;
            } else if (toast.type === 'info') {
              badgeBg = 'bg-[#0b1c30] text-blue-400 border border-blue-500';
              icon = <Sparkles className="h-4 w-4 shrink-0 text-blue-400" />;
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-3.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-bold ${badgeBg} pointer-events-auto`}
              >
                {icon}
                <span>{toast.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* SCREEN: LANDING */}
          {currentScreen === 'landing' && (
            <motion.div 
              key="landing"
              className="w-full flex-1 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LandingPage 
                onStartFreeTrial={() => setCurrentScreen('onboarding')}
                onEnterSandbox={handleEnterSandbox}
              />
            </motion.div>
          )}

          {/* SCREEN: ONBOARDING ASSISTIDO */}
          {currentScreen === 'onboarding' && (
            <motion.div 
              key="onboarding"
              className="w-full flex-1 overflow-y-auto bg-[#f8f9ff]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <OnboardingWizard 
                onComplete={handleOnboardingComplete}
                onCancel={() => setCurrentScreen('landing')}
              />
            </motion.div>
          )}

          {/* SCREENS: WORKSPACE OPERATOR DESKTOP HUB (ADMIN CONSOLE) */}
          {['dashboard', 'routes', 'integrations'].includes(currentScreen) && (
            <motion.div 
              key="workspace"
              className="w-full flex-1 h-full flex overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dynamic Left Sidebar Drawer (Screenshot 3 & 4 layout aesthetics) */}
              <aside className="w-64 bg-[#0b1c30] text-gray-300 flex flex-col justify-between p-5 border-r border-[#1a2c42] shrink-0">
                <div className="space-y-8">
                  {/* Branding Header with custom company context */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-white text-base tracking-tight leading-none block">Logística Pro</span>
                        <span className="text-[10px] text-blue-400 font-bold block mt-0.5 uppercase tracking-widest">{companyConfig.segment}</span>
                      </div>
                    </div>
                    
                    {/* Small tag badge inside sidebar */}
                    <div className="mt-4 p-2 bg-[#12233c] rounded-xl border border-[#213551] flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold max-w-[130px] truncate">{companyConfig.companyName}</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">PRO</span>
                    </div>
                  </div>

                  {/* Primary Workspace Navigation stack */}
                  <nav className="space-y-1.5">
                    <button 
                      type="button" 
                      onClick={() => setCurrentScreen('dashboard')}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors border-none cursor-pointer ${
                        currentScreen === 'dashboard'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                          : 'text-[#8a91a5] hover:bg-[#12233c] hover:text-white'
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard Geral</span>
                    </button>

                    <button 
                      type="button" 
                      onClick={() => setCurrentScreen('routes')}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors border-none cursor-pointer ${
                        currentScreen === 'routes'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                          : 'text-[#8a91a5] hover:bg-[#12233c] hover:text-white'
                      }`}
                    >
                      <Route className="h-4 w-4" />
                      <span>Otimizar Rotas</span>
                    </button>

                    <button 
                      type="button" 
                      onClick={() => setCurrentScreen('integrations')}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors border-none cursor-pointer ${
                        currentScreen === 'integrations'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                          : 'text-[#8a91a5] hover:bg-[#12233c] hover:text-white'
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      <span>Canais & Integrações</span>
                    </button>
                  </nav>
                </div>

                {/* Bottom items: Support, settings, logout */}
                <div className="space-y-2 border-t border-[#1a2c42] pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowSupportModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl text-[#8a91a5] hover:bg-[#12233c] hover:text-white font-bold text-xs flex items-center gap-3 transition-colors border-none text-left cursor-pointer"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Abrir Chamado</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setCurrentScreen('landing')}
                    className="w-full py-2.5 px-4 rounded-xl text-red-400 hover:bg-red-950/20 font-bold text-xs flex items-center gap-3 transition-colors border-none text-left cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>Sair da Conta</span>
                  </button>
                </div>
              </aside>

              {/* Main Content Workspace viewport */}
              <div className="flex-1 flex flex-col min-w-0">
                
                {/* Secondary Topbar Header for Admin Desk (Screenshot 3 & 4 layout aesthetics) */}
                <header className="h-16 border-b border-gray-200 bg-white flex justify-between items-center px-6 md:px-8 shadow-sm">
                  <div className="text-xs text-gray-500">
                    Sincronizador Automático: <span className="text-emerald-600 font-bold">● Ativado e Monitorando</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Ring alerts */}
                    <button 
                      type="button" 
                      onClick={() => addToast('Nenhum alerta crítico registrado nesta operação.', 'info')}
                      className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors relative"
                    >
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <Bell className="h-4.5 w-4.5" />
                    </button>

                    {/* Technical Profile widget */}
                    <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                      <div className="text-right">
                        <span className="font-extrabold text-xs text-[#0b1c30] block">Operador Alves</span>
                        <span className="text-[10px] text-gray-400 font-semibold block leading-none">ID: #021-OP</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#0b1c30] text-blue-400 font-bold text-xs flex items-center justify-center border border-gray-200 shadow-sm uppercase">
                        {companyConfig.companyName.substring(0, 2)}
                      </div>
                    </div>
                  </div>
                </header>

                {/* Sub View conditional routing rendering */}
                {currentScreen === 'dashboard' && (
                  <DashboardView 
                    companyName={companyConfig.companyName}
                    fleetSize={companyConfig.fleetSize}
                    onCreateNewRoute={() => setCurrentScreen('routes')}
                    onNavigateTo={(scr) => setCurrentScreen(scr as any)}
                    deliveries={deliveries}
                    setDeliveries={setDeliveries}
                    addToast={addToast}
                  />
                )}

                {currentScreen === 'routes' && (
                  <RoutesView 
                    companyName={companyConfig.companyName}
                    addToast={addToast}
                  />
                )}

                {currentScreen === 'integrations' && (
                  <IntegrationsView 
                    onAddSimulatedDelivery={(item) => setDeliveries(prev => [item, ...prev])}
                    addToast={addToast}
                  />
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Embedded Support Ticket dialogue floating modal popup */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-sm text-[#0b1c30]">Fale com o Suporte Técnico</h3>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowSupportModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <p className="text-xs text-gray-500 leading-normal">
                  Sua equipe tem atendimento priorizado em até 15 minutos em dias úteis úteis. Explique seu problema operacional de faturamento, API ou roteirização com detalhes.
                </p>

                <div className="space-y-1">
                  <label htmlFor="support_subject" className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">ASSUNTO</label>
                  <input 
                    id="support_subject"
                    type="text" 
                    placeholder="Ex: Instabilidade no Webhook Shopify"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-xs rounded-xl text-gray-950 focus:ring-1 focus:ring-blue-600 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="support_message_area" className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">MENSAGEM / TELEMETRIA</label>
                  <textarea 
                    id="support_message_area"
                    rows={4}
                    placeholder="Descreva o que ocorreu de forma direta..."
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-xs rounded-xl text-gray-950 focus:ring-1 focus:ring-blue-600 font-semibold resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowSupportModal(false)}
                    className="px-4 py-2 border border-gray-200 text-xs rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all text-center"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white text-xs rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
                  >
                    Enviar Chamado
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
