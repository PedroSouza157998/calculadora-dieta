# 📝 Introdução e Problema
O projeto DietAI nasceu da necessidade imediata de uma nutricionista recém-formada que enfrentava dificuldades para criar, gerir e aprimorar continuamente os cardápios de seus pacientes. Embora existam ferramentas de apoio no mercado, elas apresentam um alto custo de aquisição e subscrição, criando uma barreira financeira significativa para profissionais em início de carreira.
Este cenário revelou uma clara deficiência no mercado em termos de acessibilidade e custo-benefício. O problema central que buscamos resolver é a ineficiência operacional no processo de criação, adaptação e manutenção de cardápios, o que exige tempo excessivo e esforço manual do profissional.
# ✨ Solução Inovadora: Nutrição Impulsionada por IA
Nossa solução busca democratizar o acesso à tecnologia avançada. Identificamos uma oportunidade de inovação ainda não explorada: a integração estratégica da Inteligência Artificial (IA). Ao incorporar a IA, podemos não apenas replicar funcionalidades de concorrentes a custo reduzido, mas também revolucionar a eficiência e a personalização do processo.
A IA é utilizada para acelerar drasticamente o planejamento alimentar, automatizando de forma inteligente etapas que consomem o tempo do nutricionista.
O sistema utiliza IA para:
- Processar dados complexos, como restrições dietéticas, preferências pessoais, histórico clínico e objetivos nutricionais.
- Gerar sugestões de cardápios e variações de refeições em tempo real.
Isso permite que o nutricionista se liberte do trabalho operacional e foque na interação humana e no aconselhamento.
# 🛠️ Funcionalidades Chave
O DietAI foca na inovação da funcionalidade central do nutricionista: a construção do cardápio, por meio de dois prompts principais,.
### 1. Geração Automatizada de Refeições:
  - Automatiza a geração de refeições e cardápios personalizados a partir de parâmetros definidos pelo nutricionista.
  - O prompt de geração de refeições utiliza informações como restrições alimentares, objetivo nutricional (ganho ou perda de peso) e calorias desejadas, integrando a tabela nutricional para evitar alucinações e garantir a coerência.
### 2. Conversão de Porções com IA (Prompt Especializado):
- Cria uma solução de apoio para a conversão de porções alimentares em medidas padronizadas (gramas).
- Esta funcionalidade foi solicitada pelo próprio cliente validador (a nutricionista), pois é um meio muito comum de se medir as calorias de uma refeição.
- O prompt converte medidas caseiras (como colher de sopa, xícara ou concha) em valores aproximados em gramas para diferentes alimentos, ampliando a utilidade prática da solução,.
# 💻 Tecnologias e Arquitetura
O projeto seguiu a estrutura de uma SPA (Single Page Application) e foi desenvolvido utilizando tecnologias onde a equipe possuía domínio.
| Categoria | Tecnologia | Detalhe |
| :--- | :--- | :--- |
| **Framework** | Next.js com Typescript | Escolhido por ser um framework full-stack e pela familiaridade da equipe. |
| **Estilização** | Tailwind e Vite | Utilizados na construção e design. |
| **Inteligência Artificial** | Gemini Flash 2.5 (API) | Ferramenta principal para execução de tarefas de IA, utilizada gratuitamente por meio de uma assinatura pro para estudantes. |
| **Autenticação** | Auth0 | Escolhido por ser popular e possuir um teste gratuito generoso. |
| **Arquitetura** | SPA (Sem backend dedicado) | Estrutura escolhida para reduzir custos de hospedagem e agilizar a entrega do MVP. |

# 🚀 Metodologia
O desenvolvimento seguiu a metodologia AIDesign (AI-Driven Design), que se caracteriza por ser uma abordagem colaborativa e iterativa entre o desenvolvedor e uma Inteligência Artificial generativa (Gemini CLI). A gestão do projeto foi inspirada no SCRUM e na gestão de tarefas baseada no Kanban.
As principais fases incluíram:
1. **Imersão:** Identificação da ineficiência operacional e busca por soluções, constatando a baixa inovação funcional nos concorrentes,.
2. **Idealização:** Filtrou-se ideias (com apoio de uma nutricionista revisora), escolhendo a geração de refeições com IA por representar uma oportunidade de inovação no Blue Ocean da criação de cardápios,.
3. **Prototipagem:** Desenvolvimento de Provas de Conceito (POCs) para validar a geração de calorias por porção caseira (POC 1) e a geração do cardápio completo (POC 2), aprimorando os prompts para garantir a coerência nutricional.
4. **Validação:** Interação constante com a nutricionista revisora, que forneceu feedback essencial para aprimoramentos, como a adição da conversão de porção caseira em gramas.

# ⚖️ Considerações Éticas e Transparência
A utilização de IA generativa no DietAI foi concebida para atuar exclusivamente como ferramenta de apoio à decisão, e não como substituta do nutricionista. A responsabilidade final e o conhecimento técnico permanecem sob a gestão do profissional.
### Mitigação de Riscos:
- **Apoio à Decisão:** A solução se limita ao planejamento alimentar, sem emitir diagnósticos ou prescrições médicas.
- **Transparência:** O nutricionista tem pleno conhecimento de que as sugestões e conversões são geradas por uma IA a partir de prompts definidos.
- **Validação Profissional:** As interações com a IA partem sempre de parâmetros definidos pelo profissional, e o desenho dos prompts visa gerar respostas estruturadas e coerentes, facilitando a validação humana antes da aplicação prática,.
