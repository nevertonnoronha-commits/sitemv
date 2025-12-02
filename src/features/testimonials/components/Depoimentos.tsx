import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useState, useEffect } from "react";

// Componente de contador animado para avaliações
function AnimatedCounter() {
  const [count, setCount] = useState(3500);
  const maxCount = 3580;

  useEffect(() => {
    // Incrementa a cada 8-15 segundos aleatoriamente
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= maxCount) return prev;
        // Incrementa de 1 a 3 aleatoriamente
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, maxCount);
      });
    }, Math.random() * 7000 + 8000); // Entre 8 e 15 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={count}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString('pt-BR')}+
    </motion.span>
  );
}

const TEXT_COLOR = "#FFFFFF";

const TestimonialsColumn = ({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: { text: string; image: string; name: string; role: string }[];
  className?: string;
  duration?: number;
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <motion.div
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl w-full max-w-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium" style={{ color: TEXT_COLOR }}>{testimonial.name}</h4>
                <p className="text-sm" style={{ color: TEXT_COLOR }}>{testimonial.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: TEXT_COLOR }}>
              "{testimonial.text}"
            </p>
            <div className="flex gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Depoimentos() {
  const testimonials = [
    {
      text: "Uso o serviço do Marcos para minhas viagens de negócio há 2 anos. Sempre pontual, carro impecável e extremamente profissional.",
      image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDE4MDIxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "João Silva",
      role: "Gerente de Vendas",
    },
    {
      text: "Como mulher viajando sozinha, confiança é tudo. Marcos é extremamente respeitoso e profissional. Senti-me 100% segura.",
      image: "https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjQyNDExODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Ana Costa",
      role: "Consultora",
    },
    {
      text: "Contratamos para nosso casamento. O carro estava perfeito, e o Marcos foi de uma gentileza admirável. Fez nosso dia especial.",
      image: "https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjQyMTUxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Paulo Martins",
      role: "Salvador",
    },
    {
      text: "Excelente serviço! Marcos conhece Salvador como ninguém. Sempre indica as melhores rotas e evita trânsito.",
      image: "https://images.unsplash.com/photo-1584940121258-c2553b66a739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZSUyMG1hbGV8ZW58MXx8fHwxNzY0MjQ0MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Ricardo Santos",
      role: "Empresário",
    },
    {
      text: "Pontualidade impecável. Nunca tive problemas com atrasos. Recomendo para viagens corporativas.",
      image: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDE3NjMyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Marina Oliveira",
      role: "Executiva",
    },
    {
      text: "Serviço diferenciado. O carro é sempre limpo, climatizado e o atendimento é excepcional.",
      image: "https://images.unsplash.com/photo-1580643375398-5174902ebcec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VyJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjY4MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Carlos Ferreira",
      role: "Diretor Comercial",
    },
    {
      text: "Marcos é meu motorista de confiança há 3 anos. Profissionalismo e segurança em todas as viagens.",
      image: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyNjgyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Fernanda Lima",
      role: "Advogada",
    },
    {
      text: "Atendimento VIP do início ao fim. Recomendo para quem busca qualidade e conforto.",
      image: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW8lMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI2ODIxOXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Roberto Alves",
      role: "CEO",
    },
    {
      text: "Transporte de alto padrão! Sempre que preciso ir ao aeroporto, ligo para o Marcos. Zero stress!",
      image: "https://images.unsplash.com/photo-1666330404750-061d4858593b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YW50JTIwd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjQyNjgyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Juliana Menezes",
      role: "Gerente de Projetos",
    },
    {
      text: "Confiança e segurança são palavras que definem o serviço. Muito satisfeita!",
      image: "https://images.unsplash.com/photo-1752650736215-0130f82db4fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0MjY4MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Patricia Rocha",
      role: "Médica",
    },
    {
      text: "Melhor motorista executivo de Salvador! Atendimento impecável e veículo de primeira.",
      image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdWl0fGVufDF8fHx8MTc2NDIyNTM0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Eduardo Cardoso",
      role: "Arquiteto",
    },
    {
      text: "Sempre que recebo clientes internacionais, confio no Marcos. Nunca me decepcionou!",
      image: "https://images.unsplash.com/photo-1762341116897-921e2a52f7ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwY29uZmlkZW50fGVufDF8fHx8MTc2NDI1MTMzNXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Bruna Tavares",
      role: "Relações Internacionais",
    },
    {
      text: "Profissionalismo e educação em cada detalhe. Marcos faz a diferença!",
      image: "https://images.unsplash.com/photo-1611585192040-e3ed9623d13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXJlY3RvciUyMG1hbGUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjQyNjgyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Thiago Nascimento",
      role: "Analista Financeiro",
    },
    {
      text: "Serviço 5 estrelas! Carro limpo, motorista educado e pontualidade absoluta.",
      image: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI1NTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Camila Barbosa",
      role: "Designer",
    },
    {
      text: "Recomendo de olhos fechados! Melhor custo-benefício de Salvador.",
      image: "https://images.unsplash.com/photo-1658249682512-1bb162538ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MjY4MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Leonardo Pires",
      role: "Contador",
    },
    {
      text: "Marcos transformou minhas viagens de trabalho em momentos tranquilos e produtivos.",
      image: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI2ODIyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Daniela Correia",
      role: "Engenheira",
    },
    {
      text: "Excelência! Faz 4 anos que uso o serviço e nunca tive problema algum.",
      image: "https://images.unsplash.com/photo-1539618450343-13bc2c60ca45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3QlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjQyNjgyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Rodrigo Freitas",
      role: "Empresário",
    },
    {
      text: "Atendimento personalizado e carro sempre impecável. Vale cada centavo!",
      image: "https://images.unsplash.com/photo-1753162658653-d33c53910d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDI2ODIyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Amanda Silva",
      role: "Jornalista",
    },
    {
      text: "Profissional exemplar! Recomendo para todos os meus colegas de trabalho.",
      image: "https://images.unsplash.com/photo-1729109976830-e43699abd9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjgyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Felipe Moreira",
      role: "Consultor TI",
    },
    {
      text: "Segurança e conforto em primeiro lugar. Marcos entende o que é serviço premium.",
      image: "https://images.unsplash.com/photo-1543430720-fa600c67e423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NDE5ODA1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Vanessa Aragão",
      role: "Psicóloga",
    },
    {
      text: "Nunca mais usei aplicativos depois que conheci o serviço do Marcos. Diferença gritante!",
      image: "https://images.unsplash.com/photo-1589652739890-77a7733b8a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50YW50JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDI2ODIyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Gabriel Souza",
      role: "Publicitário",
    },
    {
      text: "Confiável, pontual e sempre muito educado. Meu motorista favorito!",
      image: "https://images.unsplash.com/photo-1598549687090-31c1b6df7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXN0JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNjgyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Larissa Campos",
      role: "Professora",
    },
    {
      text: "O melhor transporte executivo que já utilizei. Marcos é sensacional!",
      image: "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YW50JTIwbWFsZSUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDI2ODIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Marcelo Dias",
      role: "Veterinário",
    },
    {
      text: "Serviço impecável! Sempre que viajo a Salvador, agendo com o Marcos.",
      image: "https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsaXN0JTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MjY4MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Bianca Monteiro",
      role: "Farmacêutica",
    },
    {
      text: "Profissionalismo de outro nível! Recomendo para viagens importantes.",
      image: "https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBtYW58ZW58MXx8fHwxNzY0MjY4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "André Batista",
      role: "Dentista",
    },
    {
      text: "Carro limpo, ar condicionado perfeito e motorista educadíssimo. Nota 10!",
      image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VyJTIwd29tYW4lMjBjb25maWRlbnR8ZW58MXx8fHwxNzY0MjY4MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Tatiana Reis",
      role: "Nutricionista",
    },
    {
      text: "Marcos é sinônimo de qualidade e confiança. Cliente fiel há 5 anos!",
      image: "https://images.unsplash.com/photo-1523287409476-a9e70a25af3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMG1hbnxlbnwxfHx8fDE3NjQyNDQ3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Lucas Machado",
      role: "Fisioterapeuta",
    },
    {
      text: "Transporte executivo de verdade! Vale muito a pena.",
      image: "https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0MjY4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Isabela Carvalho",
      role: "Fonoaudióloga",
    },
    {
      text: "Excelente em todos os aspectos. Melhor escolha para transporte em Salvador!",
      image: "https://images.unsplash.com/photo-1758875568932-0eefd3e60090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyNjgyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Vinicius Gomes",
      role: "Personal Trainer",
    },
    {
      text: "Segurança, pontualidade e educação. Marcos tem tudo isso e muito mais!",
      image: "https://images.unsplash.com/photo-1748723941010-3822af70f9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXBpc3QlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI2ODIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Renata Teixeira",
      role: "Chef de Cozinha",
    },
    {
      text: "Atendimento diferenciado! Sempre que preciso, sei que posso contar.",
      image: "https://images.unsplash.com/photo-1523287409476-a9e70a25af3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMG1hbnxlbnwxfHx8fDE3NjQyNDQ3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Diego Pereira",
      role: "Fotógrafo",
    },
    {
      text: "Melhor custo-benefício! Serviço premium com preço justo.",
      image: "https://images.unsplash.com/photo-1522206038088-8698bcefa6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMHdvbWFufGVufDF8fHx8MTY0MjQ0NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Aline Nogueira",
      role: "Estilista",
    },
    {
      text: "Marcos é simplesmente excepcional! Profissionalismo puro.",
      image: "https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDE4NDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Bruno Costa",
      role: "Músico",
    },
    {
      text: "Confiança total! Sempre indico para amigos e familiares.",
      image: "https://images.unsplash.com/photo-1758691737587-7630b4d31d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBidXNpbmVzc3dvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjQyNjgyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Carla Mendes",
      role: "Bailarina",
    },
    {
      text: "Serviço impecável do início ao fim. Marcos é o melhor!",
      image: "https://images.unsplash.com/photo-1658249682516-c7789d418978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb25maWRlbnQlMjBtYW58ZW58MXx8fHwxNzY0MjY4MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Rafael Azevedo",
      role: "Ator",
    },
    {
      text: "Pontualidade britânica! Nunca me deixou na mão.",
      image: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyMTA0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Priscila Santos",
      role: "Produtora",
    },
  ];

  // Divide os depoimentos em 3 colunas para o efeito de scroll infinito
  const firstColumn = testimonials.slice(0, 12);
  const secondColumn = testimonials.slice(12, 24);
  const thirdColumn = testimonials.slice(24, 36);

  return (
    <section id="depoimentos" className="py-16 sm:py-20 lg:py-24 px-4 relative bg-black">
      {/* Background sólido preto - sem partículas visíveis */}
      <div className="absolute inset-0 bg-black z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - CENTRALIZADO COM ANIMAÇÕES */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-4"
          >
            <div className="border border-white/10 py-1.5 px-4 rounded-full text-white/60 text-[10px] uppercase tracking-widest">
              Depoimentos
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tighter"
          >
            9000+ Clientes Satisfeitos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-4"
          >
            Confiança que se vê nos detalhes.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 mx-auto"
          />
        </motion.div>

        {/* Testimonials Columns */}
        <div className="flex justify-center gap-4 sm:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[700px] overflow-hidden mb-20">
          <TestimonialsColumn testimonials={firstColumn} duration={30} />
          <TestimonialsColumn testimonials={secondColumn} duration={35} />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={32}
          />
        </div>

        {/* Stats - SEM CARDS, UM DE CADA VEZ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {[
            { label: "Clientes", value: "9000+" },
            { label: "Anos", value: "8" },
            { label: "Avaliações 5★", value: <AnimatedCounter /> },
            { label: "Satisfação", value: "100%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -4 }}
              className="text-center group cursor-default"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15 + 0.3,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500"
              >
                {stat.value}
              </motion.div>
              <div className="text-white/40 text-xs sm:text-sm uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}