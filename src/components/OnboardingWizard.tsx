/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  HelpCircle, 
  Check, 
  Store, 
  MapPin, 
  CheckCircle, 
  Compass, 
  Sparkles,
  Zap,
  Truck
} from 'lucide-react';
import { OnboardingState, OnboardingStep } from '../types';

interface OnboardingWizardProps {
  onComplete: (data: Partial<OnboardingState>) => void;
  onCancel: () => void;
}

export default function OnboardingWizard({ onComplete, onCancel }: OnboardingWizardProps) {
  const [step, setStep] = useState<number>(1); // 1: Empresa, 2: Conexão, 3: Primeira Rota, 4: Sucesso
  const [companyName, setCompanyName] = useState<string>('TransMendes Logística');
  const [segment, setSegment] = useState<string>('E-commerce Geral');
  const [fleetSize, setFleetSize] = useState<number>(18);
  const [integration, setIntegration] = useState<string>('VTEX');
  const [vtexAccount, setVtexAccount] = useState<string>('transmendes_vtex_prod');
  const [calculatingRoute, setCalculatingRoute] = useState<boolean>(false);
  const [routeStepCompleted, setRouteStepCompleted] = useState<boolean>(false);

  // Validation
  const isEmpresaValid = companyName.trim().length > 0 && fleetSize > 0;

  const handleNextStep = () => {
    if (step === 1) {
      if (isEmpresaValid) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setCalculatingRoute(true);
      setTimeout(() => {
        setCalculatingRoute(false);
        setRouteStepCompleted(true);
        setStep(4);
      }, 1500);
    } else if (step === 4) {
      onComplete({
        companyName,
        segment,
        fleetSize,
        integrationSelected: integration,
        firstRouteAdded: true
      });
    }
  };

  const stepsList: { num: number; key: OnboardingStep; label: string }[] = [
    { num: 1, key: 'Empresa', label: 'Empresa' },
    { num: 2, key: 'Conexão', label: 'Conexão' },
    { num: 3, key: 'Primeira Rota', label: 'Primeira Rota' },
    { num: 4, key: 'Sucesso', label: 'Sucesso' }
  ];

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen font-sans flex flex-col justify-between">
      {/* Top Header matching mockup exactly */}
      <header className="bg-white border-b border-[#c3c6d7] h-16 px-6 md:px-12 flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <span 
            className="font-black text-xl text-blue-600 tracking-tight cursor-pointer flex items-center gap-2"
            onClick={onCancel}
          >
            <Truck className="h-5 w-5" /> Logística Pro
          </span>
          <span className="hidden sm:inline-block text-xs border-l border-gray-300 pl-4 text-gray-500 font-bold uppercase tracking-wider">
            ONBOARDING ASSISTIDO
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-gray-500">Precisa de ajuda?</span>
          <a 
            href="#suporte" 
            onClick={(e) => { e.preventDefault(); alert('Nosso suporte entrará em contato em seu e-mail!'); }}
            className="flex items-center gap-1 text-blue-600 hover:underline ui-link"
          >
            <HelpCircle className="h-4 w-4" /> Suporte
          </a>
        </div>
      </header>

      {/* Main onboarding layout */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 flex flex-col items-center">
        {/* Step Indicator Progress Bar matching Screen 1 custom design */}
        <div className="w-full max-w-2xl mb-12">
          <div className="relative flex justify-between items-center">
            {/* Horizontal Line background */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>
            
            {/* Connected highlight line */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 transition-all duration-500 z-0"
              style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
            ></div>

            {stepsList.map((s) => {
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div 
                    onClick={() => {
                      if (s.num < step) setStep(s.num);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ui-card cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md scale-110 shadow-blue-200' 
                        : isCompleted 
                        ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : s.num}
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide transition-colors ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Workspace Card */}
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-3xl p-8 shadow-xl relative min-h-[440px] flex flex-col justify-between ui-border-hover ui-card-lift-subtle">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">Vamos configurar sua empresa</h2>
                  <p className="text-sm text-gray-500 mt-1.5 text-center sm:text-left">Insira os detalhes básicos para personalizarmos seu painel profissional.</p>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Company Name */}
                  <div className="space-y-1">
                    <label htmlFor="company_name" className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase">NOME DA EMPRESA</label>
                    <input 
                      id="company_name"
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 text-gray-950 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
                      placeholder="Ex: TransMendes Logística"
                    />
                  </div>

                  {/* Segment and Fleet Size Side-by-Side to match Screen 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="segment_select" className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase">SEGMENTO</label>
                      <select 
                        id="segment_select"
                        value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 text-gray-950 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium appearance-none"
                      >
                        <option value="Alimentício">Alimentício</option>
                        <option value="E-commerce Geral">E-commerce Geral</option>
                        <option value="Materiais Escolares">Materiais Escolares</option>
                        <option value="Peças & Auto">Peças & Auto</option>
                        <option value="Farmácia & Saúde">Farmácia & Saúde</option>
                        <option value="Bebidas & Adega">Bebidas & Adega</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="fleet_size" className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase">TAMANHO DA FROTA</label>
                      <input 
                        id="fleet_size"
                        type="number" 
                        value={fleetSize || ''}
                        onChange={(e) => setFleetSize(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 text-gray-950 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all font-medium"
                        placeholder="Ex: 18"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Conecte sua plataforma de vendas</h2>
                  <p className="text-sm text-gray-500 mt-1.5">Receba pedidos automaticamente do seu e-commerce para roteirização rápida em tempo real.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-4 gap-2">
                    {['VTEX', 'Shopify', 'Nuvemshop', 'Custom'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setIntegration(item)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs font-bold ui-btn ${
                          integration === item 
                            ? 'bg-blue-50 border-blue-600/80 text-blue-600 shadow-sm' 
                            : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-50 hover:border-gray-300/80'
                        }`}
                      >
                        <Store className="h-5 w-5" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>

                  {integration === 'VTEX' && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-gray-700">CONFIGURAR LOJA VTEX</h4>
                      <div className="space-y-1">
                        <label htmlFor="vtex_store_key" className="block text-[9px] font-bold text-gray-400">NOME DO AMBIENTE (ACCOUNT NAME)</label>
                        <input 
                          id="vtex_store_key"
                          type="text" 
                          value={vtexAccount}
                          onChange={(e) => setVtexAccount(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 text-xs rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-600 font-medium"
                          placeholder="EX: transmendes_vtex_prod"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 leading-normal">Seus pedidos VTEX marcados como "Pronto para entrega" serão sincronizados a cada 2 minutos no painel.</p>
                    </div>
                  )}

                  {integration !== 'VTEX' && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-center py-6">
                      <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2 animate-bounce" />
                      <p className="text-xs font-semibold text-gray-700">Canal de vendas pronto para sincronização</p>
                      <p className="text-[10px] text-gray-400 mt-1 max-w-[340px] mx-auto">Você poderá alterar ou revogar chaves e Webhooks a qualquer momento direto na aba "Integrações".</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Criar sua primeira rota de testes</h2>
                  <p className="text-sm text-gray-500 mt-1.5">Defina seu ponto de saída (Galpão/CD) e mapeie 3 entregas em São Paulo para ver a mágica da otimização.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-2xl space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="min-w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">🛫</div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">ORIGEM DO DESPACHO (SEU CD)</h4>
                        <p className="text-xs text-gray-500 font-semibold mt-0.5">CD TransMendes — Av. Dr. Gastão Vidigal, 1946, Vila Leopoldina, São Paulo - SP</p>
                      </div>
                    </div>

                    <hr className="border-blue-100" />

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">ENTREGAS SIMULADAS DE HOJE:</h4>
                      <ul className="space-y-1.5">
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                          <span>Drogaria Saúde Total — Rua da Consolação, 2302, Consolação</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                          <span>Papelaria Central do Estudante — Av. Paulista, 1578, Bela Vista</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                          <span>Mercado Bom Preço — Rua Oscar Freire, 800, Jardins</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {calculatingRoute ? (
                    <div className="text-center py-6 bg-[#f8f9ff] rounded-2xl border border-dashed border-blue-400 space-y-2">
                      <Zap className="h-6 w-6 text-blue-600 mx-auto animate-spin" />
                      <p className="text-xs font-semibold text-blue-600">Otimizando percurso com Inteligência Artificial...</p>
                      <p className="text-[10px] text-gray-400">Organizando paradas por proximidade e tráfego habitual.</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400">Pressione continuar para deixar o algoritmo Logística Pro rodar a roteirização automatizada.</p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-center"
              >
                <div className="flex justify-center">
                  <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Onboarding concluído!</h2>
                  <p className="text-sm text-gray-500 max-w-[420px] mx-auto">Sua empresa foi cadastrada. O ambiente sandbox foi povoado com 142 veículos monitorados, 38 rotas ativas e integração VTEX com chave de API gerada.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left space-y-2.5 max-w-[400px] mx-auto text-xs font-semibold">
                  <p className="text-gray-500">RESUMO DA INSTALAÇÃO:</p>
                  <div className="flex justify-between border-b pb-1 text-gray-800">
                    <span>Nome Cadastrado:</span>
                    <span className="text-black font-extrabold">{companyName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-gray-800">
                    <span>Frota Inicial:</span>
                    <span className="text-black">{fleetSize} Motoristas Ativos</span>
                  </div>
                  <div className="flex justify-between text-gray-800">
                    <span>Canal de Sincronismo:</span>
                    <span className="text-blue-600 font-extrabold">{integration}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
            {step > 1 && step < 4 ? (
              <button
                type="button"
                id="btn_onb_back"
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 px-4 py-2 border border-gray-200/80 rounded-xl hover:bg-gray-50 ui-btn hover:border-gray-300/80"
              >
                Voltar
              </button>
            ) : (
              <button
                type="button"
                id="btn_onb_cancel"
                onClick={onCancel}
                className="text-xs font-bold text-gray-400 hover:text-gray-700 hover:underline px-2 py-2 ui-link"
              >
                Sair
              </button>
            )}

            <button
              type="button"
              id="btn_onb_next"
              disabled={step === 1 && !isEmpresaValid}
              onClick={handleNextStep}
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 ui-btn shadow-md border-none ${
                step === 1 && !isEmpresaValid 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                  : step === 4 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100 hover:shadow-lg hover:-translate-y-0.5' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <span>{step === 4 ? 'Acessar o Painel Central' : step === 3 ? 'Otimizar & Cadastrar' : 'Continuar'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer matching design style */}
      <footer className="py-6 border-t border-gray-200 text-center text-[10px] text-gray-400 font-medium">
        © 2026 Logística Pro • Ambiente Seguro de Configuração assistida por IA
      </footer>
    </div>
  );
}
