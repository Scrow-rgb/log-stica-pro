/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle, 
  TrendingUp, 
  Truck, 
  Shield, 
  Clock, 
  Zap, 
  ChevronRight,
  Globe,
  Smartphone,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onStartFreeTrial: () => void;
  onEnterSandbox: () => void;
}

export default function LandingPage({ onStartFreeTrial, onEnterSandbox }: LandingPageProps) {
  const [deliveries, setDeliveries] = useState(150);
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#c3c6d7] flex justify-between items-center h-16 px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-blue-600" />
          <span className="font-extrabold text-xl tracking-tight text-blue-600">Logística Pro</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[#434655] hover:text-blue-600 transition-colors font-medium text-sm">Funcionalidades</a>
          <a href="#pricing" className="text-[#434655] hover:text-blue-600 transition-colors font-medium text-sm">Preços</a>
          <a href="#integrations" className="text-[#434655] hover:text-blue-600 transition-colors font-medium text-sm font-semibold border-b-2 border-transparent hover:border-blue-600 pb-1">Integrações</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            type="button"
            id="btn_sandbox_header"
            onClick={onEnterSandbox} 
            className="text-xs text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-all transition-transform active:scale-95"
          >
            Demo Rápida
          </button>
          <button 
            type="button"
            id="btn_onboarding_header"
            onClick={onStartFreeTrial} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Começar Grátis
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <span className="inline-block bg-[#dbe1ff] text-[#003ea8] px-4 py-1.5 rounded-full font-semibold text-xs mb-6 uppercase tracking-wider">
              ⚡ EFICIÊNCIA LOGÍSTICA PARA PMEs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1c30] leading-[1.1] tracking-tight mb-6">
              Otimize suas entregas, <span className="text-blue-600">reduza custos</span>.
            </h1>
            <p className="text-base md:text-lg text-[#434655] mb-8 max-w-[540px] leading-relaxed">
              A solução completa de Last-Mile para pequenas e médias empresas brasileiras. Gerencie rotas de forma inteligente, acompanhe motoristas em tempo real e integre seu e-commerce em minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                id="btn_hero_onboarding"
                onClick={onStartFreeTrial} 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Começar grátis 
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                type="button"
                id="btn_hero_sandbox"
                onClick={onEnterSandbox} 
                className="border-2 border-[#737686] text-[#0b1c30] px-8 py-4 rounded-xl font-bold text-base hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 bg-transparent"
              >
                Ver demonstração
              </button>
            </div>

            {/* Quick Metrics Badge */}
            <div className="mt-8 flex items-center gap-6 text-[#434655] border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold">Sem taxa de adesão</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold">Instalação em 5 minutos</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl -z-10"></div>

            {/* Simulated Desktop Preview styled nicely */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-gray-200 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              <img 
                alt="Dashboard Logística Pro" 
                className="rounded-2xl w-full object-cover shadow-inner hover:scale-[1.01] transition-transform duration-700" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9f3jZW3PN5Agezl6m73iDvGI-s0w5q-fDB6AFIB6xjDS7lrtLnuXKJFoStowzjg26MhcPKGkrU982Px-HsqBP5QptQcS9UTQVQhGmY9EsWz-2QdTdzALBtGV0jV36iKt6zr5MZ_1taQdLAxwFYSXLuuwC2oBBIi2trYoPeJx2wjElqUQ-ofUWa45YVViVF2RxnSYgVrDAJjB3FuxZwuuUE9QPD-IltxPVuWNheGKbmmZg32K_9Tr2pCtjSBlpm7CXmFX_ARay2rk" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="mb-20 text-center py-10 border-y border-[#c3c6d7] bg-white" id="integrations">
        <p className="text-xs font-bold text-[#737686] uppercase tracking-[0.2em] mb-6">INTEGRE COM AS PRINCIPAIS PLATAFORMAS</p>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-20 px-6">
          <div className="flex flex-col items-center group cursor-pointer">
            <span className="font-sans font-black text-[#0b1c30] text-2xl group-hover:text-blue-600 transition-colors">VTEX</span>
            <span className="text-[10px] text-[#737686] font-semibold mt-1">Conexão Nativa</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <span className="font-sans font-black text-[#0b1c30] text-2xl group-hover:text-[#9c27b0] transition-colors">Shopify</span>
            <span className="text-[10px] text-[#737686] font-semibold mt-1">Plug & Play</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <span className="font-sans font-black text-[#0b1c30] text-xl group-hover:text-blue-500 transition-colors">Nuvemshop</span>
            <span className="text-[10px] text-[#737686] font-semibold mt-1">Homologado</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <span className="font-sans font-black text-[#0b1c30] text-xl group-hover:text-amber-500 transition-colors">Loja Integrada</span>
            <span className="text-[10px] text-[#737686] font-semibold mt-1">Sincronização Ativa</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="mb-20 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">Visibilidade Total da Operação</h2>
          <p className="text-[#434655] mt-2 max-w-xl mx-auto">Tecnologia avançada de roteirização simplificada para acelerar despachos e garantir que cada pacote chegue no menor tempo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Roteirização */}
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-between min-h-[340px] relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative z-10 max-w-md">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mb-6 text-blue-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Roteirização Inteligente</h3>
              <p className="text-[#434655] text-sm leading-relaxed mb-6">
                Nosso algoritmo inteligente agrupa pedidos geograficamente e desenha o fluxo ideal de paradas, reduzindo a quilometragem rodada em até 30% em centros urbanos movimentados como São Paulo, RJ e BH.
              </p>
              <div className="flex gap-2">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Até -30% Km</span>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Economia de Combustível</span>
              </div>
            </div>
            
            {/* Visual Route Mock */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-35 group-hover:opacity-60 transition-opacity duration-300 hidden sm:block">
              <img 
                className="w-full h-full object-cover rounded-tl-[3rem] border-l border-t border-gray-100" 
                alt="City Route Map Grid" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-n6-znq9xBjWAhLRYFwXAODbOczX93drBHhBQ-nftUjH8aGINbr_lnpIZH8UE31dk6NZw9UC1vKA-e8EWQJ8631wKZU1hAtQoHVWIJpmsO-iaD3wBtZST246eNvcZ0keEQbTbT9rGEdRv8vSkmhOxLR-pZfeWhw2DlfvKLkD-PHcPxVF7DW7QhyFOk2fhQmG4-_9mVDvy1TeUhw0GVMBudf5_5-EWPiOux3nRzX0Rh7AqSpwVXzc4A4lNBbiKu6Hd23B2MpUXctg" 
              />
            </div>
          </div>

          {/* Card 2: Track & Trace */}
          <div className="md:col-span-4 bg-blue-600 text-white rounded-2xl p-8 flex flex-col justify-between min-h-[340px] hover:shadow-xl transition-all duration-300">
            <div className="bg-white/10 p-3 rounded-xl w-fit text-white">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Track & Trace</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Rastreamento em tempo real para os seus clientes com notificações interativas automáticas enviadas direto via WhatsApp ao alterar o status do pacote.
              </p>
              <div className="flex items-center gap-2 bg-blue-700/55 p-3 rounded-xl">
                <Smartphone className="h-5 w-5 text-white" />
                <span className="text-xs font-semibold">Simplicidade Móvel para Motoristas</span>
              </div>
            </div>
          </div>

          {/* Card 3: Digital POD */}
          <div className="md:col-span-4 bg-white rounded-2xl p-8 border border-gray-200 border-l-4 border-l-[#006c49] flex flex-col justify-between min-h-[220px] hover:shadow-xl transition-all duration-300">
            <div>
              <div className="bg-emerald-50 text-[#006c49] p-3 rounded-xl w-fit mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-1">Comprovante Digital</h3>
              <p className="text-[#434655] text-xs leading-relaxed">
                Proof of Delivery (POD) robusto e sem papel. Capture fotos das faturas assinadas e assinaturas diretamente na tela do smartphone do seu entregador.
              </p>
            </div>
          </div>

          {/* Card 4: Performance Dashboard */}
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl transition-all duration-300">
            <div className="flex-1">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit mb-4 text-indigo-600">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-1">Dashboard de Performance</h3>
              <p className="text-[#434655] text-xs leading-relaxed">
                Acompanhe o andamento geral das frotas com indicadores vitais em tempo real: volume parado, tempo de descarga por motorista, percursos duplicados e despesas brutas.
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center min-w-[100px]">
                <p className="text-[10px] font-bold text-emerald-800 uppercase">Eficiência</p>
                <p className="text-2xl font-black text-[#006c49]">98%</p>
                <span className="text-[9px] text-[#006c49] font-semibold">↑ Excelente</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center min-w-[100px]">
                <p className="text-[10px] font-bold text-blue-800 uppercase">Entregas</p>
                <p className="text-2xl font-black text-blue-600">1.2k</p>
                <span className="text-[9px] text-blue-600 font-semibold">Este Mês</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map ROI Feature Spotlight */}
      <section className="bg-white py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-2">RESULTADOS COMPROVADOS</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30]">Por que mudar para o Logística Pro?</h2>
            <p className="text-[#434655] mt-4 mb-6 leading-relaxed">
              O frete de última milha (last-mile) consome até 53% do orçamento de envio. Nossa plataforma foi planejada para dar visibilidade estrita por motorista e automatizar a roteirização de pacotes do e-commerce.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0b1c30]">Redução de custos operacionais</h4>
                  <p className="text-xs text-[#434655]">Menos quilômetros rodados resultam diretamente em menos manutenções de veículos e menor consumo de gasolina.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit">
                  <Star className="h-5 w-5 fill-blue-600 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#0b1c30]">Fidelização e menor taxa de reclamações</h4>
                  <p className="text-xs text-[#434655]">Clientes finais felizes com links e-commerce que mostram de verdade onde o motorista está em cima de mapas ricos.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-[#0b1c30] text-sm mb-4">Veja seu potencial de economia imediato:</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="input_deliveries_per_day" className="block text-xs font-medium text-gray-500 mb-1">Entregas diárias estimadas</label>
                <input 
                  id="input_deliveries_per_day"
                  type="range" 
                  min="10" 
                  max="500" 
                  value={deliveries} 
                  onChange={(e) => setDeliveries(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer" 
                />
                <div className="flex justify-between text-xs font-semibold text-gray-500 mt-1">
                  <span>10 entregas</span>
                  <span className="text-blue-600">~{deliveries} / dia</span>
                  <span>500 entregas</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
                <p className="text-xs font-medium text-gray-500">Estimativa de economia mensal de frete:</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-gray-900">Até</span>
                  <span className="text-3xl font-black text-blue-600 font-mono">R$ {Math.round(deliveries * 32.4).toLocaleString('pt-BR')}</span>
                  <span className="text-xs font-medium text-emerald-600">/mês economizados</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Cálculo baseado na diminuição média de 25% de gasolina e ganho de 19% de velocidade em rotas otimizadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#f8f9ff] scroll-mt-20" id="pricing">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1c30]">Planos que acompanham seu crescimento</h2>
            <p className="text-[#434655] mt-2 text-sm">Sem taxas de implantação. Cancele e altere planos quando quiser.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Plan: Gratuito */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-between hover:border-gray-400 transition-colors duration-200 relative">
              <div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Gratuito</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-[#0b1c30]">R$0</span>
                </div>
                <p className="text-xs text-[#737686] mb-6">Para testes e pequenos negócios locais</p>
                
                <hr className="border-gray-100 mb-6" />
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Até 50 entregas/mês</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Roteirização básica</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Link de rastreio de cliente</span>
                  </li>
                </ul>
              </div>

              <button 
                type="button"
                id="btn_plan_free"
                onClick={onStartFreeTrial} 
                className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-center text-sm"
              >
                Começar Agora
              </button>
            </div>

            {/* Plan: Profissional */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                ⚡ MAIS POPULAR
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Profissional</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-[#0b1c30]">R$199</span>
                  <span className="text-[#737686] text-sm">/mês</span>
                </div>
                <p className="text-xs text-[#737686] mb-6">Ideal para operações em expansão de PMEs</p>
                
                <hr className="border-gray-100 mb-6" />

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Até 1.000 entregas/mês</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Roteirização avançada com AI</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Integração Shopify / VTEX / API</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Suporte VIP em português</span>
                  </li>
                </ul>
              </div>

              <button 
                type="button"
                id="btn_plan_prof"
                onClick={onStartFreeTrial} 
                className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all text-center text-sm shadow-md"
              >
                Assinar Agora
              </button>
            </div>

            {/* Plan: Enterprise */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-between hover:border-gray-400 transition-colors duration-200 relative">
              <div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-extrabold text-[#0b1c30]">Sob consulta</span>
                </div>
                <p className="text-xs text-[#737686] mb-6">Para frotas maiores e necessidades sob demanda</p>
                
                <hr className="border-gray-100 mb-6" />

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Entregas ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Webhooks + Web SDK própria</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Gestor de conta exclusivo</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#434655]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>SLA de disponibilidade 99.9%</span>
                  </li>
                </ul>
              </div>

              <button 
                type="button"
                id="btn_plan_ent"
                onClick={onStartFreeTrial} 
                className="w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-center text-sm"
              >
                Falar com Vendas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 py-16 px-6 text-center text-white relative overflow-hidden max-w-[1440px] mx-auto rounded-3xl mb-12 shadow-lg">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">Pronto para transformar sua logística?</h2>
          <p className="text-blue-100 text-base mb-8">
            Junte-se a centenas de distribuidoras, armarinhos e lojas virtuais brasileiras que reduziram custos e melhoraram a satisfação do cliente com Logística Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              id="btn_cta_onboarding"
              onClick={onStartFreeTrial} 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg"
            >
              Criar conta gratuita
            </button>
            <button 
              type="button"
              id="btn_cta_sandbox"
              onClick={onEnterSandbox} 
              className="border border-white/40 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95"
            >
              Ver demonstração
            </button>
          </div>
        </div>
        
        {/* Background Details */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1c30] text-gray-400 py-16 px-6 md:px-12 border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-800 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-blue-500" />
              <span className="font-extrabold text-white text-lg">Logística Pro</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Otimizando rotas de última milha no Brasil com tecnologia inteligente e dados em tempo real.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Produto</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrações</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Planos de Preços</a></li>
              <li><span className="text-gray-600">Novidades (Em breve)</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Suporte</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Documentação</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Central de Ajuda</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={onEnterSandbox}>Contato Direto</span></li>
              <li><span className="text-emerald-500 font-semibold flex items-center gap-1">● Todos os sistemas online</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacidade</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Cookies</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center opacity-60 text-xs gap-4">
          <p>© 2026 Logística Pro Brasil LTDA. Todos os direitos reservados.</p>
          <div className="flex gap-4 items-center">
            <Globe className="h-4 w-4" />
            <span>Português (Brasil)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
