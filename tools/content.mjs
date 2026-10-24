/* ==========================================================================
   Excellence Medical — site content
   Every page of Excellence.html is generated from this file by tools/build.mjs.
   Edit here, then run:  node tools/build.mjs
   Clinic details, prices, Mr Roy's career and the video testimonials are taken from
   excellencemedical.ie. The Google reviews are SAMPLES for the design preview.
   ========================================================================== */

export const clinic = {
  name: 'Excellence Medical',
  tagline: "Ireland's centre of excellence for aesthetic non-surgical, minimally invasive & minor surgical treatments",
  phone: '+353 (0)1 232 5528',
  tel: '+35312325528',
  email: 'info@excellencemedical.ie',
  address: '12 Morehampton Road, Donnybrook, Dublin 4, D04 H6C3',
  area: 'Donnybrook, Dublin 4',
  mapQuery: '12 Morehampton Road, Donnybrook, Dublin 4, D04 H6C3',
  consultation: '€150',
  legal: 'Aesthetic Excellence Ltd trading as Excellence Medical. Registered office: 34 Liffey Court, Liffey Valley Park, Lucan, Co. Dublin. Company No. 535815.',
  hours: [
    [1, 'Monday', '10:30 AM – 4:30 PM'], [2, 'Tuesday', '10:30 AM – 4:30 PM'], [3, 'Wednesday', '10:30 AM – 4:30 PM'],
    [4, 'Thursday', '10:30 AM – 4:30 PM'], [5, 'Friday', '10:30 AM – 4:30 PM'], [6, 'Saturday', 'Closed'], [0, 'Sunday', 'Closed']
  ],
  social: [
    ['facebook', 'Facebook', 'https://www.facebook.com/excellence.medical.ireland'],
    ['instagram', 'Instagram', 'https://www.instagram.com/excellencemedicalclinic/'],
    ['x', 'X (Twitter)', 'https://twitter.com/Excellence_Med'],
    ['linkedin', 'LinkedIn', 'https://ie.linkedin.com/in/mrshunilroy'],
    ['youtube', 'YouTube', 'https://youtube.com/channel/UCh7SKlLcScGrW6K8TpTCyvA']
  ]
};

/* Free stock photos from Pexels (pexels.com/license), loaded from Pexels' image CDN */
export const px = (id, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const KINSTA = 'https://excellencemedical.kinsta.cloud/wp-content/uploads';

export const doctor = {
  name: 'Mr Shunil Roy',
  short: 'Mr Roy',
  quals: 'M.B.B.S, FRCS (Edinburgh)',
  role: 'Medical Director & Surgeon',
  photo: `${KINSTA}/2018/12/Dr-Shunil-Roy-Excellence-Medical-x001.jpg`, // 673 × 448, from the clinic's website
  photoAlt: 'Mr Shunil Roy in his clinic',
  photo2: `${KINSTA}/2017/04/dr-shunil-roy02a.jpg`,
  lead: 'A Fellow of the Royal College of Surgeons of Edinburgh with over 20 years in aesthetic medicine and minimally invasive cosmetic surgery. Mr Roy personally performs every treatment and procedure at Excellence Medical.',
  about: [
    'Mr Shunil Roy is a qualified surgeon and an internationally recognised expert in aesthetic medicine and minimally invasive cosmetic surgery. He trained in the UK and Ireland, and received his Postgraduate Surgical Fellowship (FRCS) from the Royal College of Surgeons of Edinburgh in 1997, before a six-year Irish training programme in cardio-thoracic surgery.',
    'His career then moved to aesthetic medicine, where he has built a loyal following for an approach that combines surgical precision with an artistic eye. He has pioneered several procedures in Ireland, including Silhouette Soft, and is regularly asked to train doctors and surgeons through lectures and live demonstrations in Ireland and abroad.',
    'Mr Roy has appeared on Irish television and radio and written for print media, always with the aim of helping the public understand what treatments can and cannot do. All of his procedures are performed under local anaesthetic, avoiding the risks of a general anaesthetic and keeping downtime to a minimum.'
  ],
  timeline: [
    ['1997', 'Fellowship of the Royal College of Surgeons of Edinburgh', 'Postgraduate Surgical Fellowship (FRCS)'],
    ['6 years', 'Cardio-thoracic surgical training', 'Irish higher surgical training programme'],
    ['2006', 'Introduced Smart-Lipo laser lipolysis to Ireland', 'In step with its debut in the United Kingdom'],
    ['2008', 'Introduced the Silhouette Lift to Ireland', 'The first generation of suture lifts'],
    ['2012', 'Pioneered Silhouette Soft in Ireland', "Now one of Ireland's most experienced practitioners"],
    ['Today', 'Trainer, speaker and industry consultant', 'Irish College of General Practitioners surgical skills courses; national and international conferences']
  ],
  focus: ['Silhouette Soft & Definisse lifts', 'Anti-wrinkle treatments', 'Dermal fillers & facial contouring', 'Platelet rich plasma', 'Minor surgery under local anaesthetic', 'Medical botulinum toxin']
};

/* ---------- treatment categories ----------
   card: one line for cards · price: shown on cards · facts: three facts on the page head
   prices: rows for the price guide · photo: Pexels id · pos: object-position */
export const categories = {
  'anti-wrinkle': {
    title: 'Anti-Wrinkle Treatments', short: 'Anti-Wrinkle', icon: 'syringe', photo: 7581583, pos: 'center 35%', price: 'From €250',
    card: "Soften frown lines, forehead lines and crow's feet, with no downtime.",
    lead: 'Precise, low-dose wrinkle-relaxing injections that soften expression lines while your face stays natural and expressive.',
    facts: [['Treatment time', '15–20 minutes'], ['Results', 'In 3–14 days, lasting 3–4 months'], ['Fee', 'From €250']],
    about: [
      'Lines on the forehead, between the brows and around the eyes are formed by the muscles we use to frown, squint and smile. A few carefully placed micro-injections relax those muscles just enough for the skin above them to smooth out.',
      'Mr Roy studies how your face moves before deciding the dose and the exact points, so you still look like yourself, only more rested. Treatment takes a few minutes, needs no anaesthetic, and you can go straight back to work.'
    ],
    suitable: ['Frown lines between the eyebrows', 'Horizontal forehead lines', "Crow's feet and smile lines", 'A heavy brow or low eyebrows', 'Lines around the lips, chin and neck'],
    prices: [['One area', '€250'], ['Two areas', '€350'], ['Three areas', '€425'], ['Brow lift', '€250']],
    steps: [
      ['Consultation', 'Mr Roy studies your expressions, talks through what you would like to change and agrees a plan and price with you.'],
      ['Treatment', 'Fine micro-injections are placed in the chosen muscles. It takes 10–15 minutes and most people feel only a small pinch.'],
      ['Review', 'Results build over 3–14 days. A review at two weeks lets us fine-tune the result if needed.']
    ],
    faq: [
      ['How long do results last?', 'Usually three to four months. With regular treatment many people find their lines soften further and results last longer.'],
      ['Will I look frozen?', 'No. Doses are tailored so that movement softens rather than disappears. The aim is a natural, rested look.'],
      ['Is there any downtime?', 'No. You may see small marks at the injection points for an hour or so. Avoid strenuous exercise and lying flat for four hours afterwards.']
    ]
  },

  medical: {
    title: 'Medical Treatments', short: 'Medical', icon: 'head', photo: 16131210, pos: 'center 40%', price: '€600–€800',
    card: 'Botulinum toxin for migraine, excessive sweating and teeth grinding.',
    lead: 'The same muscle-relaxing medicine used for wrinkles can also ease chronic migraine, excessive sweating and teeth grinding.',
    facts: [['Treatment time', '20–30 minutes'], ['Results', 'In 1–2 weeks, lasting 4–6 months'], ['Fee', '€600–€800']],
    about: [
      'Botulinum toxin has well-established medical uses beyond cosmetic treatment. Injected into specific muscles or into the skin, it can reduce the frequency of chronic migraine, calm overactive sweat glands and relax the jaw muscles responsible for clenching and grinding.',
      'Mr Roy reviews your history and any treatment you have already tried, and works alongside your GP or specialist where appropriate. The fee depends on the extent of treatment you need and is confirmed at your consultation.'
    ],
    suitable: ['Chronic migraine or tension headaches', 'Heavy underarm or forehead sweating', 'Teeth grinding or jaw clenching', 'A square jaw from enlarged masseter muscles', 'Tight, sore trapezius (neck and shoulder) muscles'],
    prices: [['Excessive underarm sweating', '€600–€800'], ['Excessive forehead sweating', '€600–€800'], ['Chronic migraine', '€600–€800'], ['Masseter (jaw) treatment', '€600–€800'], ['Trapezius muscle treatment', '€600–€800']],
    steps: [
      ['Medical assessment', 'Your symptoms, history and previous treatments are reviewed to confirm that the treatment is right for you.'],
      ['Treatment', 'A series of fine injections into the affected area. Numbing cream can be used for sweating treatment.'],
      ['Follow-up', 'Benefits appear within one to two weeks. We review your progress and plan repeat treatment, usually every four to six months.']
    ],
    faq: [
      ['How long does sweating treatment last?', 'Most patients stay dry for six to nine months, and sometimes longer.'],
      ['Can it help with migraine?', 'For people with chronic migraine it can reduce the number and severity of headaches. It works best as part of a plan agreed with your GP or neurologist.'],
      ['Will it change my face?', 'Medical treatments target specific muscles or areas of skin. Treating the masseter muscles can gently slim a square jaw, which many patients like.']
    ]
  },

  'dermal-fillers': {
    title: 'Dermal Fillers', short: 'Dermal Fillers', icon: 'drop', photo: 34775441, pos: 'center 30%', price: 'From €400',
    card: 'Restore lost volume and soften deep lines with hyaluronic acid.',
    lead: 'Hyaluronic acid fillers that restore lost volume, soften deep folds and gently reshape the lips, cheeks, chin and nose.',
    facts: [['Treatment time', '30–45 minutes'], ['Results', 'Immediate, lasting 9–18 months'], ['Fee', 'From €400']],
    about: [
      'With age the face loses volume: the cheeks flatten, the folds from nose to mouth deepen and the lips thin. Dermal fillers made from hyaluronic acid, a substance found naturally in the skin, replace that volume and support the skin from beneath.',
      'Mr Roy uses premium fillers and a conservative, artistic approach that respects your natural proportions. Results are visible straight away and settle fully over two weeks. Most fillers contain local anaesthetic for comfort.'
    ],
    suitable: ['Deep nose-to-mouth or marionette lines', 'Thin or uneven lips', 'Flat cheeks or hollow under-eyes', 'A weak chin or uneven nose profile', 'Thinning skin on the backs of the hands'],
    prices: [['Dermal fillers', 'From €400'], ['Lip enhancement', 'From €400']],
    steps: [
      ['Consultation', 'We discuss the areas that concern you, look at the balance of your face and agree the amount of filler and the price.'],
      ['Treatment', 'The skin is cleaned and numbed, then filler is placed with a fine needle or cannula. Most treatments take 30–45 minutes.'],
      ['Aftercare', 'Mild swelling or bruising settles within a few days. We review you at two weeks and can make small refinements.']
    ],
    faq: [
      ['How long do fillers last?', 'Between nine and eighteen months, depending on the area and the product. Lips tend to need topping up sooner than cheeks.'],
      ['Is it painful?', 'Most fillers contain local anaesthetic and numbing cream is applied first, so treatment is usually very comfortable.'],
      ['Can fillers be reversed?', 'Yes. Hyaluronic acid fillers can be dissolved with an enzyme if ever needed, which is one reason we use them.']
    ]
  },

  prp: {
    title: 'Platelet Rich Plasma (PRP)', short: 'PRP', icon: 'tube', photo: 30809948, pos: 'center 40%', price: 'From €500',
    card: 'Your own platelets to refresh skin and hands, and strengthen thinning hair.',
    lead: 'A natural treatment that uses growth factors from your own blood to renew tired skin and strengthen thinning hair.',
    facts: [['Treatment time', 'About 60 minutes'], ['Course', 'Usually 3 sessions, 4–6 weeks apart'], ['Fee', 'From €500']],
    about: [
      'A small sample of your blood is spun in a centrifuge to separate the platelet rich plasma. Platelets carry growth factors that signal the skin and hair follicles to repair and regenerate.',
      'Injected back into the face, hands or scalp, PRP stimulates new collagen, improves skin texture and tone, and can thicken thinning hair. Because it comes from your own body there is no risk of allergy.'
    ],
    suitable: ['Dull, tired or crêpey skin', 'Fine lines and enlarged pores', 'Thinning hair or early hair loss', 'Ageing skin on the backs of the hands', 'Patients who prefer a natural treatment'],
    prices: [['PRP facial rejuvenation', 'From €500'], ['PRP for thinning hair', 'From €500'], ['PRP hand rejuvenation', 'From €500']],
    steps: [
      ['Blood sample', 'A small amount of blood is taken from your arm, just as for a routine blood test.'],
      ['Preparation', 'The sample is spun to concentrate the platelets, while numbing cream is applied to the treatment area.'],
      ['Treatment', 'PRP is injected into the skin or scalp. Results build over the following weeks as new collagen forms.']
    ],
    faq: [
      ['When will I see results?', 'Skin looks fresher within a few weeks and keeps improving for three months. Hair results usually take three to six months.'],
      ['How many sessions do I need?', 'Most people have a course of three sessions, four to six weeks apart, then a maintenance session once or twice a year.'],
      ['Is PRP safe?', 'Yes. It is made from your own blood, so there is no risk of an allergic reaction or rejection.']
    ]
  },

  'silhouette-soft': {
    title: 'Silhouette Soft Lift', short: 'Silhouette Soft', icon: 'lift', photo: 7010952, pos: 'center 30%', price: 'From €1,500',
    card: 'A non-surgical suture lift for the brows, cheeks, jawline and neck.',
    lead: 'A non-surgical lift with dissolvable sutures that lifts sagging skin straight away and stimulates new collagen over the months that follow.',
    facts: [['Procedure time', '45–60 minutes'], ['Results', 'Immediate, improving over 3 months'], ['Fee', 'From €1,500']],
    about: [
      'Silhouette Soft sutures are made from a dissolvable material with tiny cones along their length. Placed beneath the skin through a few small entry points, they lift and hold sagging tissue in a more youthful position, with an immediate result.',
      "As the sutures dissolve they stimulate the skin to produce new collagen, so the face keeps looking fresher for up to 18 months. Mr Roy pioneered Silhouette Soft in Ireland in 2012 and is one of the country's most experienced practitioners."
    ],
    suitable: ['Sagging cheeks and midface', 'Jowls and a softened jawline', 'Loose skin on the neck', 'Low or heavy eyebrows', 'Anyone who wants a lift without surgery'],
    prices: [['Brow lift', '€1,500'], ['Mid and lower face', '€2,500'], ['Neck lift', '€2,000']],
    steps: [
      ['Consultation', 'Mr Roy assesses your skin and facial structure to confirm that you are a good candidate, and plans the lift with you.'],
      ['Procedure', 'Under local anaesthetic, the sutures are placed through tiny entry points. There are no incisions and no stitches to remove.'],
      ['Recovery', 'Most people return to normal activities within a day or two. The result improves over three months as collagen builds.']
    ],
    faq: [
      ['How long does the lift last?', 'The lift is visible straight away and results typically last 12 to 18 months, as new collagen continues to support the skin.'],
      ['Is it surgery?', 'No. It is a minimally invasive procedure under local anaesthetic, with no incisions and no general anaesthetic.'],
      ['What is recovery like?', 'Expect some swelling, mild bruising and tightness for a few days. Avoid strenuous exercise and opening the mouth very wide for a week.']
    ]
  },

  'minor-surgery': {
    title: 'Minor Surgical Procedures', short: 'Minor Surgery', icon: 'scalpel', photo: 7446661, pos: 'center 45%', price: 'From €300',
    card: 'Cyst, lipoma, mole and skin tag removal, with no HSE waiting list.',
    lead: 'Fast, expert removal of cysts, lipomas, moles and skin tags under local anaesthetic, with no HSE waiting list. Same-day treatment is also available.',
    facts: [['Procedure time', '20–45 minutes'], ['Anaesthetic', 'Local, home the same day'], ['Fee', 'From €300']],
    about: [
      'Many skin lumps and lesions are harmless but uncomfortable, unsightly or worrying. Mr Roy, a Fellow of the Royal College of Surgeons of Edinburgh, removes them with precise surgical technique and careful attention to keeping the scar small.',
      'Procedures are carried out under local anaesthetic at the clinic. You stay awake and comfortable, and go home shortly afterwards with clear aftercare instructions. Removed tissue can be sent for laboratory analysis where appropriate.'
    ],
    suitable: ['Sebaceous or epidermoid cysts', 'Lipomas (soft, fatty lumps)', 'Moles you would like removed or checked', 'Skin tags and warts', 'Ganglion cysts and old scars'],
    prices: [['Minor surgical procedures', 'From €300']],
    steps: [
      ['Assessment', 'Mr Roy reviews your history, examines the lesion, confirms that it is suitable for removal and explains the procedure in detail.'],
      ['Local anaesthetic', 'A small injection numbs the area completely. You remain awake and feel no pain during the procedure.'],
      ['Removal and closure', 'The lesion is removed precisely and the wound closed neatly, usually with dissolvable sutures. You walk out the same day.']
    ],
    faq: [
      ['Do I need a GP referral?', 'No. You can book directly and there is no HSE waiting list. Same-day treatment is also available.'],
      ['Will it leave a scar?', 'Every incision leaves a mark, but careful technique and closure keep scars small and neat, and they fade over the following months.'],
      ['Is the tissue tested?', 'Where appropriate, the removed lesion is sent to a laboratory for analysis and we contact you with the result.']
    ]
  },

  skincare: {
    title: 'Clinical Skincare', short: 'Skincare', icon: 'skin', photo: 29648626, pos: 'center 40%', priceText: 'Priced at consultation',
    card: 'Peels, microneedling and treatments for scars, pigmentation and texture.',
    lead: 'Medical-grade treatments for skin texture, scarring, pigmentation and sun damage, planned around your own skin.',
    facts: [['Treatment time', '30–60 minutes'], ['Course', 'Usually 3–6 sessions'], ['Fee', 'Priced at consultation']],
    about: [
      'Healthy-looking skin starts with treating the cause. Chemical peels resurface dull or uneven skin, microneedling stimulates collagen to soften scars and fine lines, and targeted treatments fade pigmentation, age spots and sun damage.',
      'After examining your skin, Mr Roy recommends a course of treatment, often combined with home skincare, and explains realistic results and timescales before you begin.'
    ],
    suitable: ['Acne and acne scarring', 'Uneven texture and enlarged pores', 'Pigmentation, age spots and sun damage', 'Stretch marks and cellulite', 'Fine lines and dull skin'],
    prices: [['Skin treatments', 'Priced at consultation']],
    steps: [
      ['Skin assessment', 'Your skin type, concerns and history are assessed to choose the right treatment for you.'],
      ['Treatment course', 'Sessions are spaced a few weeks apart, so the skin can renew between them.'],
      ['Maintenance', 'We advise on home care and sun protection to help your results last.']
    ],
    faq: [
      ['How many sessions will I need?', 'Most concerns improve over a course of three to six sessions. You receive a plan and price before starting.'],
      ['Is there downtime?', 'Skin may be pink for a day or two after microneedling or a peel. Lighter peels have little or no downtime.'],
      ['Can treatments be combined?', 'Yes. Skin treatments are often combined with PRP or anti-wrinkle treatment for a better overall result.']
    ]
  }
};

/* ---------- treatments (one page each) ----------
   cat: category · text: what the concern is and how we treat it · menu: shorter label for menus (optional)
   price: overrides the category's "from" price · photo/pos: override the category photo */
export const treatments = {
  /* anti-wrinkle */
  'vertical-frown-lines': { cat: 'anti-wrinkle', title: 'Vertical Frown Lines', text: 'The vertical "11" lines between the eyebrows can make you look cross or tired even when you are relaxed. Relaxing the frown muscles softens these lines within two weeks and helps stop them from deepening.' },
  'horizontal-frown-lines': { cat: 'anti-wrinkle', title: 'Horizontal Frown Lines', text: 'Horizontal lines across the forehead form each time you raise your eyebrows. A carefully balanced dose softens them while keeping natural movement, so the brow does not drop.' },
  'smile-lines-crows-feet': { cat: 'anti-wrinkle', title: "Smile Lines & Crow's Feet", menu: "Smile lines & Crow's Feet", text: 'Fine lines that fan out from the corners of the eyes deepen with every smile and squint. A few tiny injections soften them and brighten the whole eye area.' },
  'signs-of-ageing': { cat: 'anti-wrinkle', title: 'Signs of Ageing', text: 'Starting treatment before lines become fixed helps delay the visible signs of ageing. Small, regular doses stop expression lines from etching themselves into the skin.' },
  'saggy-skin': { cat: 'anti-wrinkle', title: 'Saggy Skin', text: 'Some facial muscles pull the face downwards. Relaxing them, for example along the jaw and neck, lets the lifting muscles work for a subtle, non-surgical lift.' },
  'bunny-lines': { cat: 'anti-wrinkle', title: 'Nose Bunny Lines', text: 'Bunny lines are the diagonal creases on the sides of the nose that appear when you smile or scrunch your face. They are often treated together with frown lines for a smoother result.' },
  'eyebrow-lift': { cat: 'anti-wrinkle', title: 'Eyebrow Lift', price: '€250', text: 'Precisely placed injections relax the muscle that pulls the brow down, lifting the tail of the eyebrow by a few millimetres and opening up the eyes.' },
  'heavy-eyes': { cat: 'anti-wrinkle', title: 'Heavy Eyes', text: 'Hooded or heavy-looking upper eyelids can make you look tired. A gentle non-surgical brow lift raises the brow and lightens the whole eye area.' },
  'smokers-lines': { cat: 'anti-wrinkle', title: 'Smokers Lines', text: 'Vertical lines above the upper lip come from the repeated pursing of the lips, not only from smoking. A tiny dose relaxes the lip muscle and softens them, and deeper lines can also be treated with filler.' },
  'gummy-smile': { cat: 'anti-wrinkle', title: 'Gummy Smile', text: 'If a lot of gum shows when you smile, relaxing the muscle that lifts the upper lip lowers it slightly, for a more balanced smile.' },
  'depressed-mouth-angle': { cat: 'anti-wrinkle', title: 'Depressed Angle of Mouth', menu: 'Depressed angle of Mouth', text: 'Downturned corners of the mouth can give a sad or stern expression. Relaxing the muscle that pulls them down lifts the corners and softens the start of marionette lines.' },
  'facial-remodelling': { cat: 'anti-wrinkle', title: 'Facial Remodelling', text: 'Relaxing the large chewing muscles at the angle of the jaw slims a square or rounded face into a softer, gently elongated shape over a few weeks.' },
  'lower-jaw-definition': { cat: 'anti-wrinkle', title: 'Lower Jaw Definition', text: 'Treatment along the jawline and neck relaxes the bands that pull the lower face down, for a crisper and more defined jawline.' },
  'nose-to-mouth-lines': { cat: 'anti-wrinkle', title: 'Nose to Mouth Lines', text: 'The lines from the nose to the corners of the mouth can deepen when certain muscles are overactive. Relaxing them softens the upper part of the fold; deeper folds respond best to dermal filler.' },
  'wrinkled-neck': { cat: 'anti-wrinkle', title: 'Wrinkled Neck', text: 'Vertical bands and horizontal lines on the neck are often caused by the platysma muscle. Relaxing it smooths the neck and can sharpen the line of the jaw.' },
  'wrinkle-reducing-injections': { cat: 'anti-wrinkle', title: 'Wrinkle Reducing Injections', text: 'Our wrinkle-reducing injections treat the upper face, the lower face and the neck. Each treatment is planned around the way your face moves, so results stay natural.' },

  /* medical */
  'headache-migraine': { cat: 'medical', title: 'Headache & Migraine', text: 'For people with chronic migraine, injections into specific muscles of the head and neck can reduce the number and severity of headaches. The benefit usually lasts four to six months.' },
  depression: { cat: 'medical', title: 'Depression', text: 'Research suggests that relaxing the frown muscles may lift mood in some people with depression. It is offered alongside, never instead of, care from your GP or psychiatrist.' },
  'excessive-sweating': { cat: 'medical', title: 'Excessive Forehead & Underarm Sweating', menu: 'Excessive Forehead & Underarms', text: 'Hyperhidrosis can be embarrassing and hard to control with antiperspirants. Fine injections into the skin switch off the overactive sweat glands and keep the area dry for six to nine months.' },
  'teeth-grinding': { cat: 'medical', title: 'Teeth Grinding', text: 'Grinding and clenching, often at night, can cause jaw pain, headaches and worn teeth. Relaxing the masseter muscles eases the tension and can gently slim the jaw.' },

  /* dermal fillers */
  'deep-frown-lines': { cat: 'dermal-fillers', title: 'Deep Frown Lines', text: 'When frown lines stay etched into the skin even at rest, a small amount of soft filler lifts the crease from beneath. It is often combined with anti-wrinkle treatment for the best result.' },
  'nose-to-mouth-line': { cat: 'dermal-fillers', title: 'Nose to Mouth Line', text: 'Nasolabial folds deepen as the cheeks lose volume. Filler placed in the fold, and often in the cheek above it, softens the line while keeping the face natural.' },
  'mouth-to-lip-lines': { cat: 'dermal-fillers', title: 'Mouth to Lip Lines', text: 'Fine lines around the lips, and the lines that make lipstick bleed, respond well to a soft, fine filler that hydrates and smooths the skin.' },
  'delaying-ageing': { cat: 'dermal-fillers', title: 'Delaying the Signs of Ageing', menu: 'Delaying the signs of Ageing', text: 'Replacing volume gradually, before much of it is lost, keeps the face looking fresh. Small, well-placed amounts support the skin and soften early lines.' },
  'smokers-lines-filler': { cat: 'dermal-fillers', title: 'Smokers’ Lines', text: 'Deeper vertical lines above the upper lip are filled and smoothed with a fine filler, sometimes together with a tiny dose of anti-wrinkle treatment.' },
  'marionette-lines': { cat: 'dermal-fillers', title: 'Marionette Lines', text: 'Lines that run down from the corners of the mouth to the chin can make you look sad. Filler supports the corners of the mouth and softens the lines.' },
  'saggy-loose-skin': { cat: 'dermal-fillers', title: 'Saggy and Loose Skin', text: 'Restoring structure in the cheeks and along the jawline lifts and tightens loose skin in the lower face, and skin-quality fillers can improve firmness.' },
  'smile-lines-filler': { cat: 'dermal-fillers', title: 'Smile Lines', text: 'Lines that stay visible around the mouth after you stop smiling are softened with filler, for a smoother and fresher expression.' },
  'loss-of-facial-volume': { cat: 'dermal-fillers', title: 'Loss of Facial Volume', text: 'Hollow temples, flat cheeks and sunken areas age the face. Filler restores the lost volume and the soft contours of a younger face.' },
  'mesotherapy-face': { cat: 'dermal-fillers', title: 'Mesotherapy Face', text: 'Micro-injections of hyaluronic acid and nutrients into the skin boost hydration and glow, and improve fine lines and skin texture.' },
  'treating-scars': { cat: 'dermal-fillers', title: 'Treating Scars', text: 'Some depressed scars, such as acne or chickenpox scars, can be lifted level with the surrounding skin using filler.' },
  'forehead-frown-lines-filler': { cat: 'dermal-fillers', title: 'Forehead Lines & Frown Lines', text: 'Lines on the forehead and between the brows that remain at rest are softened with a fine filler, alongside anti-wrinkle treatment.' },
  'under-eye-hollows': { cat: 'dermal-fillers', title: 'Under Eye Hollows', text: 'Tear trough hollows cast shadows that make you look tired. A small amount of filler, placed with great care, brightens the under-eye area.' },
  'lip-enhancement': { cat: 'dermal-fillers', title: 'Lip Enhancement', price: 'From €400', photo: 34775253, pos: 'center 40%', text: 'Subtle, natural-looking lip filler adds volume, defines the border of the lips and corrects asymmetry, without the overfilled look.' },
  'chin-augmentation': { cat: 'dermal-fillers', title: 'Chin Augmentation', text: 'A stronger chin balances the profile and sharpens the jawline. Filler adds projection without surgery, with an immediate result.' },
  'nose-reshaping': { cat: 'dermal-fillers', title: 'Nose Reshaping', text: 'Non-surgical rhinoplasty uses filler to smooth a bump, lift the tip or straighten the profile in under an hour, with no downtime.' },
  'cheek-enhancement': { cat: 'dermal-fillers', title: 'Cheek Enhancement', text: 'Filler restores and lifts the cheekbones, adding contour and supporting the midface, which also softens the lines below.' },
  'hand-fillers': { cat: 'dermal-fillers', title: 'Hand Fillers', text: 'Hands lose volume with age, revealing veins and tendons. Filler restores a smoother, more youthful look to the backs of the hands.' },
  'eyebrow-lift-filler': { cat: 'dermal-fillers', title: 'Eyebrow Lift Dermal Filler Treatment', menu: 'Eyebrow Lift Dermal Filler', text: 'A little filler beneath the tail of the brow supports and lifts it, opening up the eyes. It is often combined with an anti-wrinkle brow lift.' },

  /* PRP */
  'prp-facial-rejuvenation': { cat: 'prp', title: 'Facial Rejuvenation', text: 'PRP injected into the skin of the face stimulates new collagen, improving texture, tone and fine lines for a natural, healthy glow.' },
  'hair-thinning': { cat: 'prp', title: 'Hair Thinning & Hair Loss', text: 'Growth factors from your own platelets are injected into the scalp to strengthen weak follicles and thicken thinning hair, in men and women.' },
  'prp-hand-rejuvenation': { cat: 'prp', title: 'Hand Rejuvenation', text: 'PRP improves the quality of thin, crêpey skin on the backs of the hands, and can be combined with filler to restore volume.' },

  /* Silhouette Soft */
  'midface-lift': { cat: 'silhouette-soft', title: 'Midface Lift', price: '€2,500', text: 'Lifts descended cheeks back towards their youthful position, softening the nose-to-mouth lines and restoring the contour of the midface. Priced together with the lower face.' },
  'jawline-contouring': { cat: 'silhouette-soft', title: 'Lower Jaw Line Contouring', price: '€2,500', text: 'Lifts the jowls and redefines the jawline for a cleaner, sharper lower face, without surgery. Priced together with the midface.' },
  'neck-lift': { cat: 'silhouette-soft', title: 'Neck Lift', price: '€2,000', text: 'Lifts and tightens loose skin under the chin and along the neck, for a smoother neck and a clearer angle between neck and jaw.' },
  'brow-lift': { cat: 'silhouette-soft', title: 'Silhouette Soft Eyebrow Lift', menu: 'Silhouette Soft Eye Brow Lift Treatment', price: '€1,500', text: 'Lifts a low or heavy brow to open up the eyes, with a natural arch and no incisions.' },

  /* minor surgery */
  'sebaceous-cyst-removal': { cat: 'minor-surgery', title: 'Sebaceous Cyst Removal', text: 'Cysts can grow, become infected or simply be unsightly. Removing the whole cyst, including its lining, under local anaesthetic reduces the chance of it coming back.' },
  'mole-removal': { cat: 'minor-surgery', title: 'Mole Removal', text: 'Moles removed for cosmetic reasons, or because they have changed, are excised precisely and can be sent to a laboratory for analysis.' },
  'scar-revision': { cat: 'minor-surgery', title: 'Scar Revision Procedure', menu: 'Scar Revision', text: 'An old, wide or raised scar can be surgically revised into a finer, flatter line that is far less noticeable.' },
  'lipoma-removal': { cat: 'minor-surgery', title: 'Lipoma Removal', menu: 'Lipoma', text: 'Lipomas are soft, fatty lumps under the skin. They are removed through a small incision under local anaesthetic and closed neatly.' },
  'ganglion-cyst-removal': { cat: 'minor-surgery', title: 'Ganglion Cyst Removal', text: 'Ganglion cysts are fluid-filled swellings near joints and tendons, often on the wrist. Surgical removal is the most reliable way to stop them returning.' },
  'skin-tag-removal': { cat: 'minor-surgery', title: 'Skin Tag Removal', text: 'Skin tags on the neck, eyelids, underarms or body are removed quickly and simply, often several in one visit.' },

  /* clinical skincare */
  'skin-peels': { cat: 'skincare', title: 'Skin Texture – Skin Peels', menu: 'Skin Texture - Skin Peels', text: 'Medical-grade chemical peels remove the dull outer layer of skin to reveal smoother, brighter skin, and help with pores, fine lines and uneven tone.' },
  cellulite: { cat: 'skincare', title: 'Cellulite Treatment', text: 'Treatments that improve circulation and stimulate collagen smooth the dimpled look of cellulite on the thighs and buttocks.' },
  microneedling: { cat: 'skincare', title: 'Microneedling & Dermaroller', menu: 'Microneedling', text: 'Fine needles create tiny channels in the skin that trigger its natural repair, softening scars, fine lines and enlarged pores.' },
  'skin-pigmentation': { cat: 'skincare', title: 'Skin Pigmentation', text: 'Melasma, patches of uneven colour and marks left by inflammation are treated with a tailored combination of peels and medical skincare.' },
  'acne-scarring': { cat: 'skincare', title: 'Acne and Acne Scarring', text: 'Active acne is brought under control first. Microneedling, peels and filler then improve the scars it has left behind.' },
  'stretch-marks': { cat: 'skincare', title: 'Stretch Marks', text: 'Microneedling and PRP stimulate collagen in stretch marks, making them flatter, narrower and closer to your natural skin colour.' },
  'age-spots': { cat: 'skincare', title: 'Age Spots', text: 'Flat brown spots on the face, hands and chest, caused by years of sun exposure, are faded with targeted treatment.' },
  'sun-damage': { cat: 'skincare', title: 'Skin Sun Damage', text: 'Rough texture, fine lines and uneven pigment from sun exposure improve with a course of resurfacing treatments and medical skincare.' }
};

/* ---------- menus, in the same groups as the clinic's current site ----------
   an item is a treatment slug, or [slug, label] when the menu uses a different name */
export const menuWomen = [
  [{ cat: 'anti-wrinkle', label: 'Anti-Wrinkle Treatments', items: ['vertical-frown-lines', 'horizontal-frown-lines', 'smile-lines-crows-feet', 'signs-of-ageing', 'saggy-skin', 'bunny-lines', 'eyebrow-lift', 'heavy-eyes', 'smokers-lines', 'gummy-smile', 'depressed-mouth-angle', 'facial-remodelling', 'lower-jaw-definition', 'nose-to-mouth-lines', 'wrinkled-neck', 'wrinkle-reducing-injections'] }],
  [{ cat: 'dermal-fillers', label: 'Dermal Fillers Treatments', items: ['deep-frown-lines', 'nose-to-mouth-line', 'mouth-to-lip-lines', 'delaying-ageing', 'smokers-lines-filler', 'marionette-lines', 'saggy-loose-skin', 'smile-lines-filler', 'loss-of-facial-volume', 'mesotherapy-face', 'treating-scars', 'forehead-frown-lines-filler', 'under-eye-hollows', 'lip-enhancement', 'chin-augmentation', 'nose-reshaping', 'cheek-enhancement', 'hand-fillers'] }],
  [{ cat: 'silhouette-soft', label: 'Silhouette Soft Lift', items: ['midface-lift', 'jawline-contouring', 'neck-lift', 'brow-lift'] },
   { cat: 'prp', label: 'Platelet Rich Plasma', items: ['prp-facial-rejuvenation', 'hair-thinning', 'prp-hand-rejuvenation'] }],
  [{ cat: 'minor-surgery', label: 'Minor Surgical Procedure', items: ['sebaceous-cyst-removal', 'mole-removal', 'scar-revision', 'lipoma-removal', 'ganglion-cyst-removal', 'skin-tag-removal'] },
   { cat: 'medical', label: 'Medical Treatments', items: ['headache-migraine', 'depression', 'excessive-sweating', ['excessive-sweating', 'Sweating treatment with botox'], 'teeth-grinding'] }],
  [{ cat: 'skincare', label: 'Clinical Skincare', items: ['signs-of-ageing', ['scar-revision', 'Scar Treatment'], 'wrinkled-neck', 'skin-peels', 'cellulite', 'microneedling', 'skin-tag-removal', 'skin-pigmentation', ['microneedling', 'Dermaroller'], 'acne-scarring', 'mesotherapy-face', 'stretch-marks', 'age-spots', 'sun-damage', 'saggy-loose-skin', ['delaying-ageing', 'Ageing Skin']] }]
];

export const menuMen = [
  [{ cat: 'anti-wrinkle', label: 'Anti-Wrinkle Treatment', items: [['wrinkle-reducing-injections', 'Anti-Wrinkle Treatments'], ['excessive-sweating', 'Excessive Sweating of Underarms'], ['smile-lines-crows-feet', 'Crow’s Feet']] },
   { cat: 'medical', label: 'Medical Treatment', items: [['headache-migraine', 'Migraine'], 'depression', ['teeth-grinding', 'Teeth Clenching']] }],
  [{ cat: 'dermal-fillers', label: 'Dermal Fillers Treatments', items: ['forehead-frown-lines-filler', 'eyebrow-lift-filler', 'cheek-enhancement', 'nose-reshaping', ['nose-to-mouth-line', 'Nose to Mouth Line Treatment'], ['marionette-lines', 'Marionette Lines Treatment'], ['smokers-lines-filler', 'Smokers’ Lines Dermal Filler'], 'chin-augmentation'] },
   { cat: 'prp', label: 'Platelet Rich Plasma', items: [['prp-facial-rejuvenation', 'Facial Rejuvenation Treatment'], ['hair-thinning', 'Hair Thinning & Hair Loss Treatment']] }],
  [{ cat: 'silhouette-soft', label: 'Silhouette Soft Lift', items: ['midface-lift', ['jawline-contouring', 'Jowls and Lower Jaw Line Contouring'], 'neck-lift', 'brow-lift'] },
   { cat: 'minor-surgery', label: 'Minor Surgical Procedure', items: ['sebaceous-cyst-removal', 'mole-removal', 'scar-revision', 'lipoma-removal', 'ganglion-cyst-removal', 'skin-tag-removal'] }],
  [{ cat: 'skincare', label: 'Skin Treatments', items: [['@skincare', 'Skin Care'], ['skin-peels', 'Skin Texture'], 'acne-scarring', ['skin-peels', 'Skin Peels Treatments']] }]
];

/* men's landing page: the treatments men ask about most */
export const menPopular = ['wrinkle-reducing-injections', 'excessive-sweating', 'teeth-grinding', 'hair-thinning', 'jawline-contouring', 'chin-augmentation', 'nose-reshaping', 'mole-removal', 'acne-scarring'];

/* ---------- patient video testimonials (the clinic's own YouTube channel) ---------- */
export const testimonials = [
  { id: 'XDav6Yc4GkI', title: 'Lip fillers', slug: 'lip-enhancement' },
  { id: 'cm5GbYWwrmw', title: 'Tear trough (under-eye hollows)', slug: 'under-eye-hollows' },
  { id: 'n94BnBHDdv4', title: 'Nasolabial & marionette lines', slug: 'marionette-lines' },
  { id: 'kBEwAs7UC8Y', title: 'PRP treatment', slug: 'prp-facial-rejuvenation' },
  { id: 'igOgTC6ET78', title: 'Underarm sweating', slug: 'excessive-sweating' }
];
export const tourYoutube = 'lvYlpSwTIjM';

/* ---------- Google reviews band ----------
   SAMPLE reviews for the design preview only. Replace with the clinic's live Google reviews
   (Places API or a reviews widget) before the site goes live. */
export const reviews = {
  sample: true,
  writeUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Excellence Medical, 12 Morehampton Road, Donnybrook, Dublin 4'),
  items: [
    { name: 'Aoife K.', when: 'Lip enhancement', color: '#1f8a8f', text: 'Mr Roy took the time to explain everything at my consultation and the result is subtle and natural. Exactly what I wanted.' },
    { name: 'Ciarán D.', when: 'Mole removal', color: '#7b5ea7', text: 'Booked directly with no referral, seen within the week and the scar has healed beautifully.' },
    { name: 'Niamh O.', when: 'Silhouette Soft', color: '#c2185b', text: 'The lift was immediate and nobody could tell I had anything done, they just said I looked well rested.' },
    { name: 'Gráinne L.', when: 'Anti-wrinkle', color: '#00897b', text: 'Professional, discreet and honest. I was told exactly what would and would not help before anything was done.' },
    { name: 'Mark T.', when: 'Underarm sweating', color: '#5d4037', text: 'Life-changing treatment. Months later I am still dry and no longer plan my clothes around it.' },
    { name: 'Sinéad M.', when: 'PRP for hair', color: '#3949ab', text: 'A calm, private clinic, and Mr Roy did every session himself. My hair is noticeably thicker.' }
  ]
};
