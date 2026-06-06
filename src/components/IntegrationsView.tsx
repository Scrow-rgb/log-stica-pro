/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Store, 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Globe, 
  Zap, 
  Lock, 
  Clock, 
  FileCode,
  ShieldCheck,
  Smartphone,
  CheckCircle,
  Truck
} from 'lucide-react';
import { IntegrationCard, DeliveryItem } from '../types';

interface IntegrationsViewProps {
  onAddSimulatedDelivery: (delivery: DeliveryItem) => void;
  addToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export default function IntegrationsView({ onAddSimulatedDelivery, addToast }: IntegrationsViewProps) {
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [triggeringWebhook, setTriggeringWebhook] = useState<boolean>(false);
  const [webhookLog, setWebhookLog] = useState<string[]>([
    'System: Pronto para receber requisições de webhook',
    'VTEX Hub: Sincronismo efetuado há 12 min (47 pedidos importados hoje)'
  ]);

  // Available integrations card list
  const [integrationsList, setIntegrationsList] = useState<IntegrationCard[]>([
    { id: '1', name: 'VTEX Hub', description: 'Sincronização instantânea de faturas e pedidos marcados para entrega.', connected: true, type: 'VTEX', status: 'Conectado' },
    { id: '2', name: 'Shopify Store', description: 'Importação automática de pedidos logo após o checkout aprovado.', connected: false, type: 'Shopify', status: 'Disponível' },
    { id: '3', name: 'Nuvemshop API', description: 'Integração de checkout nacional focada em pequenos lojistas.', connected: false, type: 'Nuvemshop', status: 'Disponível' },
    { id: '4', name: 'Custom Developer API', description: 'End-points REST flexíveis para integrações com sistemas ERP legados.', connected: true, type: 'Custom', status: 'Customizado' }
  ]);

  const apiKeyString = 'logi_live_ef8936ac177d85ea15d78a2p6';

  // Toggle integration state
  const handleToggleConnection = (id: string) => {
    setIntegrationsList(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.connected;
        
        addToast(
          nextState 
            ? `${item.name} integrado com êxito no ambiente de produção` 
            : `Sincronismo de ${item.name} revogado temporariamente`, 
          nextState ? 'success' : 'info'
        );

        // Update Webhook logs
        const timestamp = new Date().toLocaleTimeString();
        setWebhookLog(logs => [
          `[${timestamp}] ${item.name}: Conexão ${nextState ? 'Ativada' : 'Cancelada'}`,
          ...logs
        ]);

        return {
          ...item,
          connected: nextState,
          status: nextState ? (item.type === 'Custom' ? 'Customizado' : 'Conectado') : 'Disponível'
        };
      }
      return item;
    }));
  };

  // Copy API key Simulation
  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKeyString);
    setCopiedKey(true);
    addToast('Chave API privada copiada para a área de transferência', 'success');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Simulates a Webhook Trigger from Shopify/VTEX creating an order
  const handleTriggerSimulatedWebhook = () => {
    setTriggeringWebhook(true);
    addToast('Enviando dados fictícios via payload webhook para /api/v1/orders...', 'info');

    setTimeout(() => {
      const clients = [
        'Comercial Mendes Atacado',
        'Loja Beleza & Estilo SP',
        'Hortifruti Santa Cecília',
        'Padaria do Zé — E-commerce'
      ];
      const addresses = [
        'Av. Paulista, 726, Bela Vista, São Paulo - SP',
        'Rua Domingos de Morais, 2564, Vila Mariana, São Paulo - SP',
        'Rua Heitor Penteado, 450, Sumarezinho, São Paulo - SP',
        'Alameda Lorena, 1578, Jardim Paulista, São Paulo - SP'
      ];
      const ceps = ['01310-100', '04010-100', '05437-000', '01424-002'];

      const randomIdx = Math.floor(Math.random() * clients.length);
      const randomId = `#WEB-${Math.floor(10000 + Math.random() * 90000)}`;

      const newSimulatedItem: DeliveryItem = {
        id: randomId,
        client: clients[randomIdx],
        address: addresses[randomIdx],
        cep: ceps[randomIdx],
        status: 'Em rota',
        updatedAt: 'Há instantes',
        coordinates: {
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60
        }
      };

      onAddSimulatedDelivery(newSimulatedItem);
      
      const currentTime = new Date().toLocaleTimeString();
      setWebhookLog(logs => [
        `[${currentTime}] Webhook Recebido: ${randomId} integrado para o cliente "${clients[randomIdx]}"`,
        ...logs
      ]);

      setTriggeringWebhook(false);
      addToast(`Pedido ${randomId} importado e cadastrado no painel com sucesso!`, 'success');
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Canais e Integrações</h1>
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Sincronização de faturamento e canais de checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Core Integrations list stack */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationsList.map((item) => (
              <div 
                key={item.id}
                className={`p-6 border rounded-2xl bg-white shadow-sm flex flex-col justify-between min-h-[200px] ui-card-lift ui-border-hover relative ${
                  item.connected ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="bg-gray-50 p-2.5 rounded-xl text-[#0b1c30] border border-gray-100">
                      <Store className="h-5 w-5" />
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.connected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>{item.status}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-[#0b1c30] mt-4">{item.name}</h3>
                  <p className="text-[11px] text-gray-400 leading-normal mt-1.5">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => handleToggleConnection(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ui-btn border-none ${
                      item.connected 
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-200/60 border border-transparent' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                  >
                    {item.connected ? 'Conectado (Desvincular)' : 'Configurar Conexão'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Secure API Key Manager - Screen layout display details */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 ui-border-hover">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-bold text-gray-900">Autenticação Privada baseada em API Tokens</h3>
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              Utilize esta chave secreta para sincronizar seus pedidos diretamente por código backend (REST). Mantenha este token seguro e nunca o divulgue em repositórios de controle público.
            </p>

            <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl flex items-center justify-between gap-4 font-mono text-xs">
              <span className="text-gray-400 font-semibold select-none">TOKEN_DE_TESTES:</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 select-all font-bold">
                  {showKey ? apiKeyString : '•••••••••••••••••••••••••••••••••'}
                </span>
                
                <button 
                  type="button" 
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 hover:bg-gray-200 rounded ui-btn text-gray-500 hover:text-gray-700"
                  title={showKey ? 'Ocultar Chave' : 'Mostrar Chave'}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <button 
                type="button" 
                onClick={handleCopyKey}
                className="px-3 py-1.5 bg-white border border-gray-200/80 rounded-lg hover:bg-gray-50 flex items-center gap-1 ui-btn text-xs font-semibold hover:border-gray-300/80"
              >
                {copiedKey ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-gray-500" />}
                <span>{copiedKey ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Developer Simulator Zone sidebar panel */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 ui-border-hover">
          <div>
            <h3 className="text-xs font-bold text-blue-600 tracking-widest uppercase">CONVÉS DE WEBHOOK</h3>
            <p className="text-xs text-gray-400 mt-1">Simulador de triggers de faturamento para PMEs</p>
          </div>

          <div className="p-4 bg-[#f8f9ff] border border-blue-100 rounded-2xl relative space-y-4">
            <span className="absolute top-3 right-3 text-[9px] font-bold text-blue-500 uppercase">Ambiente Sandbox</span>
            
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <h4 className="text-xs font-bold text-gray-800">Simule um novo pedido</h4>
            </div>
            
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Clique no botão abaixo para imitar o comportamento de um checkout bem-sucedido na Shopify ou Nuvemshop. Um webhook disparará e importará um pedido de teste no Dashboard Logístico.
            </p>

            <button 
              type="button"
              disabled={triggeringWebhook}
              onClick={handleTriggerSimulatedWebhook}
              className={`w-full py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 border-none ui-btn ${
                triggeringWebhook 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {triggeringWebhook ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Gerando Checkout...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-white hover:rotate-12 transition-transform" />
                  <span>Disparar Checkout Webhook</span>
                </>
              )}
            </button>
          </div>

          {/* Webhook logs section console */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-bold">TERMINAL DE CONEXÕES ATIVAS</span>
            <div className="bg-slate-900 rounded-2xl p-4 h-48 overflow-y-auto font-mono text-[9px] text-[#22c55e] border border-slate-800 space-y-1.5 scrollbar-thin">
              {webhookLog.map((log, index) => (
                <div key={index} className="leading-relaxed whitespace-pre-wrap select-text selection:bg-[#4ade80]/30 selection:text-white">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
