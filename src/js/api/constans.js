const GROUPS = {
  BODY_PARTS: 'Body parts',
  Muscles: 'Muscles',
  Equipment: 'Equipment',
};

const MAP_GROUPS_TO_QUERY_PARAMS = {
  [GROUPS.BODY_PARTS]: 'bodypart',
  [GROUPS.Muscles]: 'muscles',
  [GROUPS.Equipment]: 'equipment',
};

const BODYPART = {
  BACK: 'back',
  CARDIO: 'cardio',
  CHEST: 'chest',
  LOWER_ARMS: 'lower arms',
  LOWER_LEGS: 'lower legs',
  NECK: 'neck',
  SHOULDERS: 'shoulders',
  UPPER_ARMS: 'upper arms',
  UPPER_LEGS: 'upper legs',
  WAIST: 'waist',
};

const MUSCLES = {
  ABDUCTORS: 'abductors',
  ABS: 'abs',
  ADDUCTORS: 'adductors',
  BICEPS: 'biceps',
  CALVES: 'calves',
  CARDIOVASCULAR_SYSTEM: 'cardiovascular system',
  DELTS: 'delts',
  FOREARMS: 'forearms',
  GLUTES: 'glutes',
  HAMSTRINGS: 'hamstrings',
  LATS: 'lats',
  LEVATOR_SCAPULAE: 'levator scapulae',
  PECTORALS: 'pectorals',
  QUADS: 'quads',
  SERRATUS_ANTERIOR: 'serratus anterior',
  SPINE: 'spine',
  TRAPS: 'traps',
  TRICEPS: 'triceps',
  UPPER_BACK: 'upper back',
};

const EQUIPMENT = {
  ASSISTED: 'assisted',
  BAND: 'band',
  BARBELL: 'barbell',
  BODY_WEIGHT: 'body weight',
  BOSU_BALL: 'bosu ball',
  CABLE: 'cable',
  DUMBBELL: 'dumbbell',
  ELLIPTICAL_MACHINE: 'elliptical machine',
  EZ_BARBELL: 'ez barbell',
  HAMMER: 'hammer',
  KETTLEBELL: 'kettlebell',
  LEVERAGE_MACHINE: 'leverage machine',
  MEDICINE_BALL: 'medicine ball',
  OLYMPIC_BARBELL: 'olympic barbell',
  RESISTANCE_BAND: 'resistance band',
  ROLLER: 'roller',
  ROPE: 'rope',
  SKIERG_MACHINE: 'skierg machine',
  SLED_MACHINE: 'sled machine',
  SMITH_MACHINE: 'smith machine',
  STABILITY_BALL: 'stability ball',
  STATIONARY_BIKE: 'stationary bike',
  STEPMILL_MACHINE: 'stepmill machine',
  TIRE: 'tire',
  TRAP_BAR: 'trap bar',
  UPPER_BODY_ERGOMETER: 'upper body ergometer',
  WEIGHTED: 'weighted',
  WHEEL_ROLLER: 'wheel roller',
};

export const ExercisesConstants = {
  GROUPS,
  MAP_GROUPS_TO_QUERY_PARAMS,
  BODYPART,
  MUSCLES,
  EQUIPMENT,
};
