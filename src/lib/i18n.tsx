import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lang } from './types'

const STORAGE_KEY = 'tarab.lang.v1'

const ar = {
  skip: 'تخطَّ إلى المحتوى',
  nav: {
    artists: 'الفنانون',
    music: 'الإصدارات',
    shows: 'الجولات',
    studio: 'الاستوديو',
    book: 'احجز جلسة',
  },
  ui: {
    play: 'شغّل',
    pause: 'إيقاف مؤقت',
    close: 'إغلاق',
    volume: 'مستوى الصوت',
    nowPlaying: 'يُشغَّل الآن',
    generated: 'معاينة صوتية مولّدة في متصفحك — ليست تسجيلات حقيقية.',
    minutesShort: 'د',
    track: 'مقطع',
    tracks: 'مقاطع',
    soldout: 'نُفدت التذاكر',
    few: 'آخر التذاكر',
    onsale: 'تذاكر متاحة',
    tickets: 'تذاكر',
    from: 'من',
    currency: 'دج',
    all: 'الكل',
    back: 'رجوع',
    next: 'التالي',
    required: 'مطلوب',
    optional: 'اختياري',
    demo: 'نموذج عرض',
    menu: 'القائمة',
    closeMenu: 'إغلاق القائمة',
    langLabel: 'تغيير اللغة',
  },
  home: {
    kicker: 'دار أسطوانات مستقلة · الجزائر العاصمة · منذ ٢٠١٩',
    titleA: 'صوتٌ',
    titleB: 'يُحدِث أثرًا',
    sub: 'نسجّل ونُصدر الموسيقى التي تُشبهنا: راي، راب، قناوة، سول. بلا وسطاء وبلا قوالب.',
    listen: 'اسمع أحدث إصدار',
    book: 'احجز الاستوديو',
    scroll: 'انزل',
    onAir: 'على الهواء',
    latest: 'أحدث إصدار',
    releasesKicker: 'الكاتالوج',
    releasesTitle: 'أربع سنوات، أربعة عشر إصدارًا',
    releasesText: 'كل إصدار يُسجَّل ويُخلَط ويُتقن داخل هذه الجدران، من أول ضربة إلى آخر تفصيل في الغلاف.',
    allReleases: 'كل الإصدارات',
    rosterKicker: 'الفنانون',
    rosterTitle: 'خمسة أسماء، خمسة عوالم',
    allArtists: 'كل الفنانين',
    studioKicker: 'الاستوديو',
    studioTitle: 'ثلاث قاعات، ولا استعجال',
    studioText: 'استوديو تسجيل ومكساج في الحمّامات، مجهّز للجلسات الطويلة: تسجيل حي، مكساج تناظري، وماسترينغ.',
    studioCta: 'عن الاستوديو',
    stats: [
      { k: '٢٠١٩', v: 'سنة التأسيس' },
      { k: '١٤', v: 'إصدارًا' },
      { k: '٥', v: 'فنانين' },
      { k: '٣', v: 'قاعات' },
    ],
    showsKicker: 'الجولات',
    showsTitle: 'المواعيد القادمة',
    showsAll: 'كل المواعيد',
    ctaTitle: 'عندك أغنية في رأسك؟',
    ctaText: 'احجز جلسة تعريفية مدتها ٣٠ دقيقة، نسمع فيها العمل ونقرر معًا الخطوة التالية.',
    ctaButton: 'احجز جلسة',
  },
  artistsPage: {
    kicker: 'الروستر',
    title: 'الفنانون',
    text: 'خمسة مشاريع مختلفة في الصوت والمزاج، تشترك في شيء واحد: لا أحد ينتظر الإذن ليُصدر.',
  },
  artist: {
    back: 'كل الفنانين',
    role: 'التخصص',
    city: 'المدينة',
    since: 'معنا منذ',
    releases: 'الإصدارات',
    noReleases: 'لا يوجد إصدار منشور بعد.',
    shows: 'المواعيد القادمة',
    noShows: 'لا مواعيد معلنة حاليًا.',
    links: 'روابط',
    tags: 'الكلمات المفتاحية',
  },
  musicPage: {
    kicker: 'الكاتالوج',
    title: 'الإصدارات',
    text: 'أربعة عشر إصدارًا منذ ٢٠١٩. كل واحد منها قابل للتشغيل هنا مباشرة — المعاينة تُولَّد في متصفحك.',
    filterAll: 'الكل',
    count: 'إصدار',
  },
  release: {
    back: 'كل الإصدارات',
    artist: 'الفنان',
    format: 'الصيغة',
    year: 'السنة',
    runtime: 'المدة',
    catalog: 'الكاتالوج',
    tracklist: 'قائمة المقاطع',
    note: 'عن الإصدار',
    credits: 'الاعتمادات',
    play: 'شغّل الإصدار',
    more: 'إصدارات أخرى',
    next: 'الإصدار التالي',
    trackLabel: 'تشغيل الإصدار',
  },
  studioPage: {
    kicker: 'الاستوديو',
    title: 'مكانٌ للعمل، لا للاستعراض',
    text: 'قاعة تسجيل رئيسية، غرفة تحكّم بميكساج تناظري، وغرفة صغيرة للكتابة. نأخذ عددًا محدودًا من المشاريع كل شهر لأن الجودة تحتاج وقتًا.',
    servicesTitle: 'الخدمات والأسعار',
    servicesText: 'الأسعار معلنة، ولا مفاجآت في الفاتورة. السعر بالساعة ويشمل مهندس الصوت.',
    gearTitle: 'المعدات',
    gearText: 'قائمة مختصرة لما نستخدمه فعلًا، لا كتالوجًا للتفاخر.',
    roomsTitle: 'القاعات',
    bookTitle: 'احجز جلسة',
    bookText: 'املأ الطلب وسنعود إليك خلال يوم عمل واحد. لا شيء يُرسل من هذا النموذج: الطلب يبقى على جهازك.',
    name: 'الاسم الكامل',
    nameHint: 'كما تريد أن نناديك',
    email: 'البريد الإلكتروني',
    emailHint: 'لإرسال العرض والمواعيد',
    phone: 'الهاتف',
    phoneHint: 'رقم جزائري، مثال: 0551 23 45 67',
    session: 'نوع الجلسة',
    date: 'التاريخ المفضّل',
    dateHint: 'المواعيد متاحة من الغد حتى ٦ أشهر',
    hours: 'عدد الساعات',
    project: 'اسم المشروع',
    projectHint: 'مثال: ألبوم أول، ثلاث مقطوعات',
    notes: 'تفاصيل إضافية',
    notesHint: 'المراجع الصوتية، الآلات، عدد الأفراد… (اختياري)',
    submit: 'أرسل الطلب',
    sending: 'يُجهَّز الطلب…',
    privacy: 'يُخزَّن الطلب في متصفحك فقط، ولا يُرسل إلى أي خادم.',
    fixErrors: 'تحقّق من الحقول المميّزة أدناه.',
    hoursValue: (h: number) => `${h} ساعة`,
    estimate: 'التقدير',
  },
  form: {
    required: 'هذا الحقل مطلوب',
    nameShort: 'اكتب الاسم الكامل (٣ أحرف على الأقل)',
    emailInvalid: 'بريد إلكتروني غير صالح',
    phoneInvalid: 'رقم هاتف جزائري غير صالح',
    dateInvalid: 'اختر تاريخًا بين الغد وستة أشهر',
    hoursInvalid: 'اختر بين ٢ و١٢ ساعة',
    projectShort: 'اكتب اسم المشروع (٣ أحرف على الأقل)',
    notesLong: 'الحد الأقصى ١٢٠٠ حرف',
    sessionInvalid: 'اختر نوع الجلسة',
  },
  sent: {
    kicker: 'تم التسجيل',
    title: 'وصلنا طلبك',
    text: 'احتفظ بهذا الرقم المرجعي. سيتواصل معك مهندس الاستوديو خلال يوم عمل واحد.',
    reference: 'الرقم المرجعي',
    summary: 'ملخّص الطلب',
    session: 'الجلسة',
    date: 'التاريخ',
    hours: 'المدة',
    estimate: 'التقدير',
    project: 'المشروع',
    contact: 'للتواصل',
    missing: 'لم نجد هذا الطلب في هذا المتصفح. قد يكون حُذف أو أُرسل من جهاز آخر.',
    again: 'اطلب جلسة أخرى',
    backHome: 'العودة للرئيسية',
    note: 'هذا نموذج عرض: لا يوجد خادم ولا بريد فعلي، والطلب محفوظ في متصفحك فقط.',
  },
  notFound: {
    code: '٤٠٤',
    title: 'هذه المقطوعة غير موجودة',
    text: 'الرابط الذي فتحته لا يشير إلى صفحة في هذا الموقع. ربما حُذف الإصدار أو تغيّر عنوانه.',
    cta: 'العودة للرئيسية',
  },
  footer: {
    tagline: 'دار أسطوانات واستوديو تسجيل مستقل في الجزائر العاصمة.',
    studio: 'الاستوديو',
    address: '١٧ شارع الحمّامات، الجزائر العاصمة',
    hours: 'الاثنين–السبت · ١٠:٠٠–٢٠:٠٠',
    contact: 'التواصل',
    label: 'الموقع',
    demoNote: 'هذا الموقع نموذج عرض بعلامة افتراضية. الأسماء والأعمال والأسعار والمواعيد كلها خيالية، ولا توجد أي معاملة حقيقية.',
    rights: 'جميع الحقوق محفوظة',
    built: 'صُمّم وبُني كنموذج عرض',
  },
}

const fr: typeof ar = {
  skip: 'Aller au contenu',
  nav: {
    artists: 'Artistes',
    music: 'Sorties',
    shows: 'Concerts',
    studio: 'Studio',
    book: 'Réserver',
  },
  ui: {
    play: 'Lire',
    pause: 'Pause',
    close: 'Fermer',
    volume: 'Volume',
    nowPlaying: 'En lecture',
    generated: 'Aperçu généré dans votre navigateur — ce ne sont pas de vrais enregistrements.',
    minutesShort: 'min',
    track: 'titre',
    tracks: 'titres',
    soldout: 'Complet',
    few: 'Dernières places',
    onsale: 'Billets disponibles',
    tickets: 'Billets',
    from: 'dès',
    currency: 'DA',
    all: 'Tout',
    back: 'Retour',
    next: 'Suivant',
    required: 'obligatoire',
    optional: 'facultatif',
    demo: 'Démo',
    menu: 'Menu',
    closeMenu: 'Fermer le menu',
    langLabel: 'Changer de langue',
  },
  home: {
    kicker: 'Label indépendant · Alger · depuis 2019',
    titleA: 'Un son',
    titleB: 'qui laisse une trace',
    sub: 'On enregistre et on publie la musique qui nous ressemble : raï, rap, gnawa, soul. Sans intermédiaires et sans moules.',
    listen: 'Écouter la dernière sortie',
    book: 'Réserver le studio',
    scroll: 'Défiler',
    onAir: 'On air',
    latest: 'Dernière sortie',
    releasesKicker: 'Catalogue',
    releasesTitle: 'Quatre ans, quatorze sorties',
    releasesText: 'Chaque sortie est enregistrée, mixée et finie entre ces murs, de la première prise au dernier détail de la pochette.',
    allReleases: 'Toutes les sorties',
    rosterKicker: 'Le roster',
    rosterTitle: 'Cinq noms, cinq mondes',
    allArtists: 'Tous les artistes',
    studioKicker: 'Le studio',
    studioTitle: 'Trois salles, aucune précipitation',
    studioText: 'Un studio d’enregistrement et de mixage à El Hamma, pensé pour les longues sessions : prise live, mixage analogique, mastering.',
    studioCta: 'Le studio',
    stats: [
      { k: '2019', v: 'Création' },
      { k: '14', v: 'Sorties' },
      { k: '5', v: 'Artistes' },
      { k: '3', v: 'Salles' },
    ],
    showsKicker: 'Concerts',
    showsTitle: 'Prochaines dates',
    showsAll: 'Toutes les dates',
    ctaTitle: 'Une chanson en tête ?',
    ctaText: 'Réservez une rencontre gratuite de 30 minutes : on écoute le projet et on décide ensemble de la suite.',
    ctaButton: 'Réserver une session',
  },
  artistsPage: {
    kicker: 'Le roster',
    title: 'Artistes',
    text: 'Cinq projets aux sons et aux humeurs différents, une seule règle commune : personne n’attend la permission pour sortir.',
  },
  artist: {
    back: 'Tous les artistes',
    role: 'Rôle',
    city: 'Ville',
    since: 'Avec nous depuis',
    releases: 'Sorties',
    noReleases: 'Aucune sortie publiée pour le moment.',
    shows: 'Prochaines dates',
    noShows: 'Aucune date annoncée.',
    links: 'Liens',
    tags: 'Mots-clés',
  },
  musicPage: {
    kicker: 'Catalogue',
    title: 'Sorties',
    text: 'Quatorze sorties depuis 2019. Chacune est écoutable ici : l’aperçu est généré dans votre navigateur.',
    filterAll: 'Tout',
    count: 'sorties',
  },
  release: {
    back: 'Toutes les sorties',
    artist: 'Artiste',
    format: 'Format',
    year: 'Année',
    runtime: 'Durée',
    catalog: 'Catalogue',
    tracklist: 'Titres',
    note: 'À propos',
    credits: 'Crédits',
    play: 'Lire la sortie',
    more: 'Autres sorties',
    next: 'Sortie suivante',
    trackLabel: 'Lire la sortie',
  },
  studioPage: {
    kicker: 'Le studio',
    title: 'Un lieu de travail, pas une vitrine',
    text: 'Une grande salle de prise, une régie en mixage analogique et une petite pièce pour écrire. On limite le nombre de projets chaque mois, parce que la qualité demande du temps.',
    servicesTitle: 'Services et tarifs',
    servicesText: 'Des tarifs affichés, sans surprise sur la facture. Prix horaire, ingénieur du son inclus.',
    gearTitle: 'Le matériel',
    gearText: 'Une liste courte de ce qu’on utilise vraiment, pas un catalogue de vanité.',
    roomsTitle: 'Les salles',
    bookTitle: 'Réserver une session',
    bookText: 'Remplissez la demande, on revient vers vous sous un jour ouvré. Rien n’est envoyé : la demande reste sur votre appareil.',
    name: 'Nom complet',
    nameHint: 'Comme vous voulez être appelé',
    email: 'E-mail',
    emailHint: 'Pour le devis et les créneaux',
    phone: 'Téléphone',
    phoneHint: 'Numéro algérien, ex. 0551 23 45 67',
    session: 'Type de session',
    date: 'Date souhaitée',
    dateHint: 'Créneaux de demain à six mois',
    hours: 'Nombre d’heures',
    project: 'Nom du projet',
    projectHint: 'Ex. premier album, trois titres',
    notes: 'Détails',
    notesHint: 'Références, instruments, nombre de personnes… (facultatif)',
    submit: 'Envoyer la demande',
    sending: 'Préparation…',
    privacy: 'La demande est stockée dans votre navigateur, elle n’est envoyée à aucun serveur.',
    fixErrors: 'Vérifiez les champs signalés ci-dessous.',
    hoursValue: (h: number) => `${h} h`,
    estimate: 'Estimation',
  },
  form: {
    required: 'Ce champ est obligatoire',
    nameShort: 'Indiquez votre nom complet (3 caractères min.)',
    emailInvalid: 'Adresse e-mail invalide',
    phoneInvalid: 'Numéro algérien invalide',
    dateInvalid: 'Choisissez une date entre demain et six mois',
    hoursInvalid: 'Choisissez entre 2 et 12 heures',
    projectShort: 'Indiquez le nom du projet (3 caractères min.)',
    notesLong: '1200 caractères maximum',
    sessionInvalid: 'Choisissez un type de session',
  },
  sent: {
    kicker: 'Enregistré',
    title: 'Demande reçue',
    text: 'Conservez cette référence. L’ingénieur du studio vous contacte sous un jour ouvré.',
    reference: 'Référence',
    summary: 'Récapitulatif',
    session: 'Session',
    date: 'Date',
    hours: 'Durée',
    estimate: 'Estimation',
    project: 'Projet',
    contact: 'Contact',
    missing: 'Demande introuvable dans ce navigateur. Elle a peut-être été supprimée ou envoyée depuis un autre appareil.',
    again: 'Réserver une autre session',
    backHome: 'Retour à l’accueil',
    note: 'Ceci est une démo : aucun serveur, aucun e-mail réel, la demande reste dans votre navigateur.',
  },
  notFound: {
    code: '404',
    title: 'Ce morceau n’existe pas',
    text: 'Le lien ne correspond à aucune page de ce site. La sortie a peut-être été retirée ou renommée.',
    cta: 'Retour à l’accueil',
  },
  footer: {
    tagline: 'Label indépendant et studio d’enregistrement à Alger.',
    studio: 'Studio',
    address: '17 rue El Hamma, Alger',
    hours: 'Lun–Sam · 10h00–20h00',
    contact: 'Contact',
    label: 'Le site',
    demoNote: 'Ce site est une démo à marque fictive. Noms, œuvres, tarifs et dates sont inventés, et aucune transaction réelle n’a lieu.',
    rights: 'Tous droits réservés',
    built: 'Conçu et développé comme démo',
  },
}

export type Copy = typeof ar

const dict: Record<Lang, Copy> = { ar, fr }

type I18nValue = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  c: Copy
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'fr') return stored
  } catch {
    /* storage blocked */
  }
  return 'ar'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      c: dict[lang],
      setLang: (next) => {
        setLangState(next)
        try {
          window.localStorage.setItem(STORAGE_KEY, next)
        } catch {
          /* storage blocked */
        }
      },
    }),
    [lang, dir],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
