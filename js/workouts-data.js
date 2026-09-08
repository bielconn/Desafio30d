// js/workouts-data.js - Catálogo Padrão de Treinos estilo Notion (Treinos A, B, C, D)
const WorkoutData = {
  defaultRoutines: {
    A: {
      id: 'A',
      name: 'Treino A',
      subtitle: 'Peito, Ombro & Tríceps',
      badge: 'Superior • Empurrar',
      color: '#3b82f6',
      exercises: [
        {
          id: 'supino_inclinado',
          order: 1,
          name: 'Supino inclinado com barra',
          tags: ['Aquecimento', 'Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Banco a 30° ou 45°. Mantenha as escápulas aduzidas e os cotovelos a ~45° do tronco para proteger o manguito.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Barbell_Bench_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop'
        },
        {
          id: 'supino_reto',
          order: 2,
          name: 'Supino reto com barra',
          tags: ['Fortalecimento', 'Aquecimento'],
          sets: 4,
          reps: '8 a 10',
          restSeconds: 90,
          notes: 'Descida controlada até tocar suavemente a linha dos mamilos. Pés firmes no chão gerando leg drive.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop'
        },
        {
          id: 'crossover',
          order: 3,
          name: 'CROSS OVER',
          tags: ['Fortalecimento'],
          sets: 3,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Tronco levemente inclinado à frente. Feche os braços imaginando que está abraçando um barril grande, contraindo o peitoral.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'
        },
        {
          id: 'desenvolvimento_halter',
          order: 4,
          name: 'Desenvolvimento com Halter',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 60,
          notes: 'Costas bem apoiadas no banco. Não bata os halteres no topo e desça até a linha dos ouvidos.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop'
        },
        {
          id: 'abducao_halter',
          order: 5,
          name: 'Abdução com Halter',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '12 a 15',
          restSeconds: 45,
          notes: 'Elevação lateral com cotovelos levemente flexionados, elevando até a altura dos ombros sem dar impulso com a coluna.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
        },
        {
          id: 'triceps_polia',
          order: 6,
          name: 'Triceps com polia',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Cotovelos travados ao lado do corpo durante todo o movimento. Estenda totalmente o antebraço contraindo o tríceps.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop'
        }
      ]
    },
    B: {
      id: 'B',
      name: 'Treino B',
      subtitle: 'Pernas, Quadril & Fortalecimento',
      badge: 'Inferior • Reabilitação',
      color: '#10b981',
      exercises: [
        {
          id: 'agachamento_livre',
          order: 1,
          name: 'Agachamento com barra livre',
          tags: ['Aquecimento', 'Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 90,
          notes: 'Base firme na largura dos ombros, pés levemente virados para fora. Desça até 90° mantendo a lombar neutra e o peito aberto.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop'
        },
        {
          id: 'agachamento_hack',
          order: 2,
          name: 'Agachamento Hack 45°',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 90,
          notes: 'Pés apoiados no centro da plataforma. Desça controlando em 3 segundos, mantendo toda a sola do pé apoiada.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'
        },
        {
          id: 'agachamento_bulgaro',
          order: 3,
          name: 'Agachamento Búlgaro',
          tags: ['Fortalecimento', 'Estabilidade'],
          sets: 3,
          reps: '10 a 12 cada perna',
          restSeconds: 60,
          notes: 'Excelente para estabilização pélvica e correção de assimetrias. Desça o joelho de trás em direção ao chão com controle.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Squat/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop'
        },
        {
          id: 'elevacao_pelvica',
          order: 4,
          name: 'Elevação Pélvica',
          tags: ['Fortalecimento', 'Glúteo'],
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Escápulas firmes no banco. Suba empurrando pelo calcanhar e segure 1 segundo no topo com máxima contração dos glúteos.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
        },
        {
          id: 'mesa_flexora',
          order: 5,
          name: 'Mesa Flexora',
          tags: ['Fortalecimento', 'Posterior'],
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Quadril pressionado contra o banco. Puxe o rolo até encostar perto do glúteo e desça sem deixar o peso bater.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop'
        },
        {
          id: 'cadeira_extensora',
          order: 6,
          name: 'Cadeira extensora',
          tags: ['Fortalecimento', 'Quadríceps'],
          sets: 4,
          reps: '12 a 15',
          restSeconds: 60,
          notes: 'Segure 1 a 2 segundos em isometria no topo para ativar ao máximo o vasto medial e proteger a patela.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop'
        },
        {
          id: 'cadeira_adutora',
          order: 7,
          name: 'Cadeira Adutora',
          tags: ['Reabilitação', 'Fortalecimento'],
          sets: 3,
          reps: '15',
          restSeconds: 60,
          notes: 'Fundamental para estabilizar a bacia e a região inguinal pós-fisioterapia. Carga moderada e controle sem trancos.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
        }
      ]
    },
    C: {
      id: 'C',
      name: 'Treino C',
      subtitle: 'Costas, Bíceps & Abdômen',
      badge: 'Superior • Puxar',
      color: '#8b5cf6',
      exercises: [
        {
          id: 'puxada_frente',
          order: 1,
          name: 'Puxada Alta Frente',
          tags: ['Aquecimento', 'Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 75,
          notes: 'Puxe a barra em direção à parte superior do peitoral, aproximando as escápulas sem jogar o tronco excessivamente para trás.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop'
        },
        {
          id: 'remada_baixa',
          order: 2,
          name: 'Remada Baixa no Cabo',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 60,
          notes: 'Coluna ereta, peito estufado. Puxe o triângulo em direção ao abdômen apertando as escápulas.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'
        },
        {
          id: 'remada_curvada',
          order: 3,
          name: 'Remada Curvada com Halteres',
          tags: ['Fortalecimento'],
          sets: 3,
          reps: '10 a 12',
          restSeconds: 60,
          notes: 'Tronco inclinado a 45° com abdômen travado. Puxe os cotovelos rente ao corpo.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Dumbbell_Row/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop'
        },
        {
          id: 'rosca_direta',
          order: 4,
          name: 'Rosca Direta com Barra W',
          tags: ['Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 60,
          notes: 'Cotovelos alinhados com o tronco. Suba sem balançar o corpo e desça controlando.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop'
        },
        {
          id: 'rosca_martelo',
          order: 5,
          name: 'Rosca Martelo com Halteres',
          tags: ['Fortalecimento', 'Braquial'],
          sets: 3,
          reps: '12',
          restSeconds: 60,
          notes: 'Pegada neutra (palmas voltadas uma para a outra). Fortalece o antebraço e a pegada.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
        },
        {
          id: 'prancha_abdominal',
          order: 6,
          name: 'Prancha Isométrica',
          tags: ['Core', 'Estabilidade'],
          sets: 3,
          reps: '45 a 60s',
          restSeconds: 45,
          notes: 'Corpo alinhado dos calcanhares à cabeça. Contraia ativamente glúteos e abdômen.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop'
        }
      ]
    },
    D: {
      id: 'D',
      name: 'Treino D',
      subtitle: 'Ombros, Core & Cardio / Mobilidade',
      badge: 'Funcional • Estabilização',
      color: '#f59e0b',
      exercises: [
        {
          id: 'desenvolvimento_arnold',
          order: 1,
          name: 'Desenvolvimento Arnold',
          tags: ['Aquecimento', 'Fortalecimento'],
          sets: 4,
          reps: '10 a 12',
          restSeconds: 60,
          notes: 'Inicie com as palmas voltadas para você e faça a rotação conforme sobe os halteres.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop'
        },
        {
          id: 'face_pull',
          order: 2,
          name: 'Face Pull na Polia',
          tags: ['Postura', 'Manguito'],
          sets: 4,
          reps: '15',
          restSeconds: 60,
          notes: 'Puxe a corda em direção aos olhos separando as mãos, com rotação externa dos ombros. Previne lesões articulares.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'
        },
        {
          id: 'ponte_gluteo',
          order: 3,
          name: 'Ponte Unilateral para Glúteo',
          tags: ['Reabilitação', 'Glúteo'],
          sets: 3,
          reps: '12 cada lado',
          restSeconds: 45,
          notes: 'Excelente para estabilização de pelve e reabilitação de membros inferiores.',
          gifUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Glute_Bridge/0.jpg',
          gifFallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop'
        },
        {
          id: 'cardio_moderado',
          order: 4,
          name: 'Cardio Contínuo (Bike / Caminhada)',
          tags: ['Cardio', 'Resistência'],
          sets: 1,
          reps: '25 a 30 minutos',
          restSeconds: 0,
          notes: 'Ritmo moderado (frequência cardíaca em zona 2). Melhora a circulação e acelera a regeneração muscular.',
          gifUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&auto=format&fit=crop',
          gifFallback: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&auto=format&fit=crop'
        }
      ]
    }
  }
};
