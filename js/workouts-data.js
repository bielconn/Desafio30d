// js/workouts-data.js - Catálogo de Treinos da Semana & Exercícios com GIFs
const WorkoutData = {
  // Divisão semanal estruturada para fortalecimento e reabilitação
  schedule: {
    1: 'leg_a',      // Segunda-feira
    2: 'upper_a',    // Terça-feira
    3: 'rest_active',// Quarta-feira (Descanso Ativo / Mobilidade)
    4: 'leg_b',      // Quinta-feira
    5: 'upper_b',    // Sexta-feira
    6: 'core_cardio',// Sábado (Cardio Leve & Core)
    0: 'rest'        // Domingo (Descanso total)
  },

  routines: {
    leg_a: {
      id: 'leg_a',
      dayName: 'Segunda-feira',
      title: 'Perna A • Quadríceps, Adutores & Estabilização',
      badge: 'Foco: Fortalecimento & Joelho/Quadril',
      color: '#10b981',
      description: 'Treino prioritário para reconstruir a força dos membros inferiores e estabilizadores pélvicos. Carga moderada e controle máximo na descida.',
      exercises: [
        {
          id: 'extensora',
          name: 'Cadeira Extensora',
          muscle: 'Quadríceps (Foco Reto Femoral)',
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Suba em 1 segundo e segure 1 segundo no topo (pico de contração). Desça controlando em 2 a 3 segundos.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop'
        },
        {
          id: 'legpress45',
          name: 'Leg Press 45°',
          muscle: 'Quadríceps, Glúteo & Isquiotibiais',
          sets: 4,
          reps: '10 a 12',
          restSeconds: 90,
          notes: 'Pés na largura dos ombros. Nunca estenda os joelhos completamente no topo (mantenha uma leve flexão para proteger a articulação). Não deixe os joelhos fecharem.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop'
        },
        {
          id: 'adutora',
          name: 'Cadeira Adutora',
          muscle: 'Adutores da Coxa (Essencial para reabilitação)',
          sets: 3,
          reps: '15',
          restSeconds: 60,
          notes: 'Movimento vital para quem teve dores na virilha/perna. Comece com carga leve a moderada, fechando com controle sem tranco e abrindo devagar.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        },
        {
          id: 'abdutora',
          name: 'Cadeira Abdutora',
          muscle: 'Glúteo Médio & Mínimo (Estabilizador do Quadril)',
          sets: 3,
          reps: '15',
          restSeconds: 60,
          notes: 'Mantenha as costas bem apoiadas no banco. Segure 1 segundo na abertura máxima. O glúteo médio forte impede que a perna desvie para dentro.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        },
        {
          id: 'panturrilha_pe',
          name: 'Panturrilha em Pé (Smith ou Máquina)',
          muscle: 'Gastrocnêmio & Sóleo',
          sets: 4,
          reps: '15 a 20',
          restSeconds: 45,
          notes: 'Alongue bem no ponto mais baixo e suba o máximo possível na ponta dos pés. A panturrilha bombeia o sangue de volta e estabiliza o tornozelo.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        }
      ]
    },

    upper_a: {
      id: 'upper_a',
      dayName: 'Terça-feira',
      title: 'Superior A • Peitoral, Ombros & Tríceps',
      badge: 'Empurrar (Push)',
      color: '#3b82f6',
      description: 'Treino focado nos músculos de empurrar para fortalecer a cintura escapular e estabilidade torácica.',
      exercises: [
        {
          id: 'supino_halteres',
          name: 'Supino Reto com Halteres',
          muscle: 'Peitoral Maior & Deltoide Anterior',
          sets: 4,
          reps: '10 a 12',
          restSeconds: 90,
          notes: 'Retraia as escápulas antes de descer os halteres. Cotovelos a 45-60 graus do tronco, sem abrir demais.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'supino_inclinado',
          name: 'Supino Inclinado (Halteres ou Máquina)',
          muscle: 'Peitoral Superior (Porção Clavicular)',
          sets: 3,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Banco em inclinação de 30° a 45°. Suba convergindo suavemente os halteres sem bater.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'elevacao_lateral',
          name: 'Elevação Lateral com Halteres',
          muscle: 'Deltoide Lateral (Ombro 3D)',
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Cotovelos levemente flexionados. Suba até a linha do ombro sem dar impulso com o tronco.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'desenvolvimento_halteres',
          name: 'Desenvolvimento com Halteres',
          muscle: 'Deltoides & Trapézio Superior',
          sets: 3,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Costas bem apoiadas. Suba de forma controlada mantendo o abdômen contraído.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'triceps_corda',
          name: 'Tríceps na Polia com Corda',
          muscle: 'Tríceps Braquial',
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Cotovelos colados ao lado das costelas. Abra a corda no final do movimento para contração máxima.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_Rope_Attachment/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        }
      ]
    },

    rest_active: {
      id: 'rest_active',
      dayName: 'Quarta-feira',
      title: 'Descanso Ativo • Mobilidade & Caminhada',
      badge: 'Regeneração & Flexibilidade',
      color: '#f59e0b',
      description: 'Dia para os músculos recuperarem glicogênio e reconstruírem fibras sem dor. Faça uma caminhada leve e mobilidade de quadril.',
      exercises: [
        {
          id: 'caminhada_leve',
          name: 'Caminhada Leve na Esteira ou Ar Livre',
          muscle: 'Cardiovascular & Circulação Ativa',
          sets: 1,
          reps: '25 a 35 min',
          restSeconds: 0,
          notes: 'Passo confortável, ritmo moderado. Ajuda na oxigenação muscular e redução de inflamações.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop'
        },
        {
          id: 'mobilidade_quadril',
          name: 'Alongamento Dinâmico de Quadril (Pigeon & 90/90)',
          muscle: 'Glúteos, Flexores de Quadril & Pélvis',
          sets: 3,
          reps: '45 seg cada lado',
          restSeconds: 30,
          notes: 'Respiração profunda. Alivia tensões na bacia e na virilha sem forçar em excesso.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Piriformis_Stretch/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop'
        },
        {
          id: 'prancha_core',
          name: 'Prancha Isométrica',
          muscle: 'Core Anterior & Transverso do Abdômen',
          sets: 3,
          reps: '30 a 45 seg',
          restSeconds: 45,
          notes: 'Abdômen duro como uma pedra e glúteos contraídos. Não deixe o quadril cair.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        }
      ]
    },

    leg_b: {
      id: 'leg_b',
      dayName: 'Quinta-feira',
      title: 'Perna B • Posterior de Coxa, Glúteo & Lombar',
      badge: 'Cadeia Posterior & Reabilitação',
      color: '#10b981',
      description: 'A cadeia posterior sustenta o quadril. Glúteo forte é a maior proteção contra dores na virilha e desequilíbrios na perna.',
      exercises: [
        {
          id: 'elevacao_pelvica',
          name: 'Elevação Pélvica / Hip Thrust',
          muscle: 'Glúteo Máximo (Rei da Estabilidade Pélvica)',
          sets: 4,
          reps: '10 a 12',
          restSeconds: 90,
          notes: 'Costas apoiadas no banco, empurre pelos calcanhares. No topo, trave os glúteos por 2 segundos. Olhar sempre para frente, queixo perto do peito.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop'
        },
        {
          id: 'mesa_flexora',
          name: 'Mesa Flexora (ou Cadeira Flexora)',
          muscle: 'Isquiotibiais (Posterior de Coxa)',
          sets: 4,
          reps: '12',
          restSeconds: 60,
          notes: 'Mantenha o quadril firme contra o banco. Não levante o bumbum ao puxar o peso. Controle a descida.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop'
        },
        {
          id: 'stiff_halteres',
          name: 'Stiff com Halteres (Carga Controlada)',
          muscle: 'Isquiotibiais & Glúteo',
          sets: 3,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Mantenha o peito aberto e coluna totalmente reta. Empurre o quadril para trás como se fosse fechar uma porta com o bumbum. Sinta alongar a coxa de trás.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Dumbbell_Deadlift/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop'
        },
        {
          id: 'afundo_estatico',
          name: 'Afundo Estático com Halteres',
          muscle: 'Glúteo, Quadríceps & Equilíbrio Unilateral',
          sets: 3,
          reps: '10 cada perna',
          restSeconds: 60,
          notes: 'Elimina assimetrias entre uma perna e outra. Desça verticalmente até o joelho traseiro quase tocar o chão. Tronco firme.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunge/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop'
        },
        {
          id: 'panturrilha_sentado',
          name: 'Panturrilha Sentado (Gêmeos)',
          muscle: 'Músculo Sóleo',
          sets: 4,
          reps: '15',
          restSeconds: 45,
          notes: 'Movimento lento. Mantenha os joelhos a 90°. Pausa de 1 segundo embaixo para retirar o efeito elástico do tendão.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        }
      ]
    },

    upper_b: {
      id: 'upper_b',
      dayName: 'Sexta-feira',
      title: 'Superior B • Costas, Bíceps & Deltoide Posterior',
      badge: 'Puxar (Pull)',
      color: '#8b5cf6',
      description: 'Fortalecimento da postura dorsal e braços, alinhando a cintura escapular e melhorando o equilíbrio do corpo todo.',
      exercises: [
        {
          id: 'puxada_alta',
          name: 'Puxada Frontal na Polia (Lat Pulldown)',
          muscle: 'Grande Dorsal & Bíceps',
          sets: 4,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Puxe a barra em direção ao início do peitoral, puxando com os cotovelos para baixo, não com as mãos. Peito estufado.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'remada_baixa',
          name: 'Remada Baixa no Triângulo (Polia)',
          muscle: 'Dorsais, Romboides & Meio das Costas',
          sets: 4,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Mantenha a coluna firme sem balançar o corpo para trás. Esmague as escápulas ao puxar.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'crucifixo_inverso',
          name: 'Crucifixo Inverso com Halteres (ou Peck Deck)',
          muscle: 'Deltoide Posterior & Trapézio',
          sets: 3,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Essencial para postura e para evitar ombros caídos para frente. Abra os braços focando na parte de trás dos ombros.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Flyes/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'rosca_direta',
          name: 'Rosca com Halteres Alternada (com Giro)',
          muscle: 'Bíceps Braquial & Braquiorradial',
          sets: 3,
          reps: '10 a 12 cada braço',
          restSeconds: 60,
          notes: 'Gire a palma da mão para cima conforme sobe o halter (supinação). Desça lentamente.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        },
        {
          id: 'rosca_martelo',
          name: 'Rosca Martelo com Halteres',
          muscle: 'Braquial & Antebraço',
          sets: 3,
          reps: '12',
          restSeconds: 60,
          notes: 'Palmas voltadas uma para a outra o tempo todo. Aumenta a força da pegada e o volume do braço.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop'
        }
      ]
    },

    core_cardio: {
      id: 'core_cardio',
      dayName: 'Sábado',
      title: 'Sábado • Core, Abdômen & Condicionamento',
      badge: 'Estabilidade & Queima Calórica',
      color: '#06b6d4',
      description: 'Treino para blindar o abdômen e a pelve. O core forte transfere força e previne qualquer recidiva de dor no quadril.',
      exercises: [
        {
          id: 'abdominal_supra',
          name: 'Abdominal Supra no Solo (com pernas elevadas)',
          muscle: 'Reto Abdominal',
          sets: 4,
          reps: '15 a 20',
          restSeconds: 45,
          notes: 'Tire apenas as escápulas do chão, soltando todo o ar ao subir e contraindo forte.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        },
        {
          id: 'deadbug',
          name: 'Deadbug (Inseto Morto)',
          muscle: 'Core Profundo & Estabilização Pélvica',
          sets: 3,
          reps: '12 cada lado',
          restSeconds: 45,
          notes: 'Excelente indicação de fisioterapia: estenda braço direito e perna esquerda sem deixar a lombar descolar do chão.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop'
        },
        {
          id: 'cardio_esteira',
          name: 'Esteira Inclinada (Caminhada Acelerada)',
          muscle: 'Condicionamento & Queima',
          sets: 1,
          reps: '20 a 30 min',
          restSeconds: 0,
          notes: 'Inclinação de 5% a 8%, velocidade moderada (sem correr para não gerar impacto forte na perna).',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop'
        }
      ]
    },

    rest: {
      id: 'rest',
      dayName: 'Domingo',
      title: 'Domingo • Descanso & Recuperação Completa',
      badge: 'Recuperação Total',
      color: '#64748b',
      description: 'O músculo cresce e se regenera no descanso. Beba bastante água, alimente-se bem e recarregue as energias para a nova semana.',
      exercises: []
    }
  }
};
