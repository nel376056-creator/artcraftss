const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);

/* ---------- Original animated SVG art ---------- */
const R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const ART={
weave:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated woven cloth"><rect width="200" height="140" fill="#f6efe0"/>${R(10,i=>`<rect x="${10+i*20}" y="0" width="8" height="140" fill="#1f3d2b"/>`)}${R(7,j=>`<rect class="weft" style="animation-delay:${j*.25}s" x="-20" y="${10+j*19}" width="240" height="9" fill="${j%2?'#d6a84f':'#b5546b'}"/>`)}</svg>`,
wood:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated tree rings with a carving line"><rect width="200" height="140" fill="#ead6b4"/>${R(7,i=>`<ellipse class="pulse" style="animation-delay:${i*.2}s" cx="100" cy="70" rx="${12+i*11}" ry="${9+i*8}" fill="none" stroke="#8d5a3b" stroke-width="3"/>`)}<path class="draw" d="M15 125 Q60 55 100 95 T185 20" fill="none" stroke="#3b2a1a" stroke-width="5" stroke-linecap="round"/></svg>`,
metal:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated anvil with glowing metal and sparks"><rect width="200" height="140" fill="#2b2d42"/><polygon points="45,82 165,82 152,104 58,104" fill="#8d99ae"/><polygon points="45,82 12,88 45,94" fill="#8d99ae"/><rect x="72" y="104" width="56" height="22" fill="#5c677d"/><rect class="glow" x="80" y="68" width="42" height="14" rx="3" fill="#ff7a3d"/>${R(8,i=>`<circle class="spark" style="--x:${(i-4)*13}px;animation-delay:${i*.2}s" cx="100" cy="66" r="2.5" fill="#ffd36b"/>`)}</svg>`,
paper:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated paper crane flapping its wings"><rect width="200" height="140" fill="#cfe8e4"/><polygon points="100,72 140,92 100,104 60,92" fill="#fffaf0" stroke="#2f6f6a"/><polygon class="flap" points="100,72 55,38 92,88" fill="#f4b8c6" stroke="#b5546b"/><polygon class="flap r" points="100,72 152,32 112,88" fill="#f4b8c6" stroke="#b5546b"/><polygon points="140,92 168,58 150,95" fill="#fffaf0" stroke="#2f6f6a"/><polygon points="60,92 28,108 66,98" fill="#fffaf0" stroke="#2f6f6a"/></svg>`,
plant:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated blooming flower"><rect width="200" height="140" fill="#f9e6ec"/><path d="M100 140 V78" stroke="#2f6f6a" stroke-width="5"/><ellipse class="sway" cx="76" cy="112" rx="20" ry="8" fill="#6aa38a"/><ellipse class="sway" cx="126" cy="104" rx="20" ry="8" fill="#6aa38a"/><g class="spin" style="transform-origin:100px 60px">${R(8,i=>`<ellipse cx="100" cy="36" rx="9" ry="22" fill="${i%2?'#b5546b':'#d97a92'}" transform="rotate(${i*45} 100 60)"/>`)}<circle cx="100" cy="60" r="11" fill="#d6a84f"/></g></svg>`,
pattern:`<svg viewBox="0 0 200 140" role="img" aria-label="Animated leaf and vine pattern"><rect width="200" height="140" fill="#1f3d2b"/>${R(5,i=>{const x=20+i*40;return `<path class="draw" style="animation-delay:${i*.3}s" d="M${x} 140 C${x-28} 100 ${x+28} 60 ${x} 14" fill="none" stroke="#d6a84f" stroke-width="2.5"/><ellipse class="sway" cx="${x+13}" cy="92" rx="15" ry="6" fill="#6aa38a" transform="rotate(-35 ${x+13} 92)"/><ellipse class="sway" cx="${x-12}" cy="56" rx="15" ry="6" fill="#6aa38a" transform="rotate(35 ${x-12} 56)"/><circle cx="${x}" cy="14" r="9" fill="#b5546b"/><circle cx="${x}" cy="14" r="3.5" fill="#d6a84f"/>`})}</svg>`,
mosaic:`<svg viewBox="0 0 200 140" role="img" aria-label="Colorful geometric mosaic"><rect width="200" height="140" fill="#f6efe0"/>${R(20,i=>{const x=20+(i%5)*40,y=20+Math.floor(i/5)*33;return `<rect x="${x}" y="${y}" width="34" height="27" rx="3" fill="${['#b5546b','#2f6f6a','#d6a84f','#8c5c9e'][i%4]}" stroke="#fffaf0" stroke-width="2"/><circle cx="${x+17}" cy="${y+13}" r="5" fill="#fffaf0"/>`})}</svg>`,
pottery:`<svg viewBox="0 0 200 140" role="img" aria-label="Handmade decorated clay pot"><rect width="200" height="140" fill="#f4e4d2"/><ellipse cx="100" cy="115" rx="48" ry="9" fill="#d6a84f" opacity=".35"/><path d="M68 42 Q100 52 132 42 L124 105 Q100 124 76 105Z" fill="#b5546b" stroke="#8d4555" stroke-width="3"/><ellipse cx="100" cy="42" rx="32" ry="9" fill="#f6c6a8" stroke="#8d4555" stroke-width="3"/><path d="M76 67 Q100 80 124 67 M77 83 Q100 96 123 83" fill="none" stroke="#f6efe0" stroke-width="4"/><circle class="pulse" cx="100" cy="73" r="7" fill="#d6a84f"/></svg>`,
embroidery:`<svg viewBox="0 0 200 140" role="img" aria-label="Embroidered flowers on teal fabric"><rect width="200" height="140" fill="#2f6f6a"/>${R(3,i=>{const x=45+i*55;return `<path d="M${x} 140 Q${x-8} 96 ${x} 70" fill="none" stroke="#d6a84f" stroke-width="3"/><ellipse cx="${x-10}" cy="108" rx="11" ry="5" fill="#9ac49b" transform="rotate(-30 ${x-10} 108)"/><g class="sway" style="transform-origin:${x}px 55px">${R(5,j=>`<ellipse cx="${x}" cy="43" rx="6" ry="15" fill="${j%2?'#f4b8c6':'#d6a84f'}" transform="rotate(${j*72} ${x} 58)"/>`)}<circle cx="${x}" cy="58" r="6" fill="#fffaf0"/></g>`})}</svg>`,
landscape:`<svg viewBox="0 0 200 140" role="img" aria-label="Painted sunset over layered hills"><rect width="200" height="140" fill="#f4b8c6"/><circle class="pulse" cx="145" cy="40" r="21" fill="#d6a84f"/><path d="M0 90 Q48 42 100 93 T200 78 V140 H0Z" fill="#6aa38a"/><path d="M0 112 Q55 70 110 112 T200 100 V140 H0Z" fill="#2f6f6a"/><path d="M0 126 Q65 100 130 128 T200 117 V140 H0Z" fill="#1f3d2b"/></svg>`
};
$$('[data-art]').forEach(e=>e.innerHTML=ART[e.dataset.art]);
$('#fr1').innerHTML=ART.weave;$('#fr2').innerHTML=ART.paper;$('#fr3').innerHTML=ART.plant;

/* ---------- Content ---------- */
const PAGES=[['home','Home'],['about','Aesthetics &amp; Craft'],['crafts','Crafts'],['design','Design'],['gallery','Gallery'],['artist','Artist'],['games','Games'],['reflect','Reflection'],['refs','References'],['team','Creators']];
$('#nav').innerHTML=PAGES.map(p=>`<a href="#${p[0]}" data-go="${p[0]}">${p[1]}</a>`).join('');
$('#homecards').innerHTML=[['about','📖','Learn','Aesthetics, craft and William Morris.'],['crafts','🧵','Crafts','Textile, wood, metal, paper and plant crafts.'],['gallery','🖼️','Gallery','Animated artworks with hidden meaning.'],['games','🎮','Play','Three games: quiz, memory and design principles.']].map(c=>`<a class="card link" href="#${c[0]}" data-go="${c[0]}"><h3>${c[1]} ${c[2]}</h3><p>${c[3]}</p></a>`).join('');

const CRAFTS={
 textile:['🧵 Textile','weave','From Latin <i>texere</i>, “to braid” or “to construct.” Any craft that works with fabric, yarn or surface design, using plant or synthetic fibers to make practical or decorative objects.',[['Cross-stitch','Counted-thread embroidery using X-shaped stitches to form a picture.'],['Crochet','Creating fabric from yarn or thread with a crochet hook.'],['Sewing','Fastening objects with stitches of needle and thread.'],['Weaving','Yarns interlaced at right angles to form cloth.'],['Tatting','Durable lace made from a series of knots and loops.'],['Shoemaking','The process of making footwear.'],['Lace','Openwork fabric patterned with holes, by hand or machine.'],['Macramé','Textile-making with basic knotting and very few tools.'],['Millinery','Designing and making hats.'],['String art','Colored thread strung between points to form geometric designs.']]],
 wood:['🪵 Wood','wood','Skill related to wood, especially in making one’s way through the woods, hunting and trapping, with links to subsistence lifestyles (Horace, 1906).',[['Carpentry','Cutting, shaping and installing building materials in construction.'],['Marquetry','Applying thin veneer pieces to a structure to form decorative designs.'],['Woodturning','Shaping wood on a lathe to create round wooden objects.'],['Wood carving','Cutting wood with tools to create objects and figures.'],['Cabinetry','Making box-shaped furniture with doors and drawers.'],['Upholstery','Building cushions and covers for furniture.']]],
 metal:['⚒️ Metal','metal','The art of executing artistic designs in metal for practical and aesthetic purposes, using bronze, silver, gold, tin, copper, lead, brass and iron.',[['Jewelry','Personal adornments: brooches, rings, necklaces, earrings, bracelets.'],['Metal casting','Pouring liquid material into a mold with a hollow cavity, then letting it solidify.'],['Welded sculpture','Statues made using welding techniques.']]],
 paper:['📜 Paper / Canvas','paper','Canvas is an extremely durable plain-woven fabric for backpacks, tents and marquees. Paper crafts use sheets and strips to build forms.',[['Bookbinding','Physically assembling a book from folded or unfolded sheets.'],['Card making','Handmade technique for producing greeting cards.'],['Collage','Artwork assembled from different forms to create a new whole.'],['Origami','The Japanese cultural art of paper folding.'],['Papier-mâché','Paper pieces or pulp bound with an adhesive.'],['Scrapbooking','Arranging and preserving personal and family history in book form.'],['Rubber stamping','Applying ink to an image carved or molded onto rubber.'],['Quilling','Paper strips rolled, shaped and glued into decorative designs.']]],
 plant:['🌸 Plant','plant','Skills that use plant parts as the medium.',[['Corn dolly making','Making shapes and figures from straw such as barley, oats and wheat.'],['Floral design','Using plant materials and flowers to create a pleasing, balanced composition.'],['Pressed flower craft','Drying petals and leaves in a press to flatten them and exclude light and moisture.']]]
};
$('#ctabs').innerHTML=Object.keys(CRAFTS).map(k=>`<button class="tab" data-k="${k}">${CRAFTS[k][0]}</button>`).join('');
function showCraft(k){const c=CRAFTS[k];$$('#ctabs .tab').forEach(t=>t.classList.toggle('on',t.dataset.k===k));
 $('#cpanel').innerHTML=`<div><div class="art tilt">${ART[c[1]]}</div><p class="cap">Original animated illustration. Meaning: ${MEAN[c[1]]}</p></div><div><h3>${c[0]} Crafts</h3><p>${c[2]}</p><ul class="clist">${c[3].map((x,i)=>`<li style="--i:${i}"><b>${x[0]}</b>: ${x[1]}</li>`).join('')}</ul></div>`;tilt($('#cpanel'))}
$('#ctabs').onclick=e=>e.target.dataset.k&&showCraft(e.target.dataset.k);

const MEAN={weave:'threads crossing at right angles show how many small acts build one whole.',wood:'tree rings record patient growth; carving honors that time.',metal:'heat and force turn raw ore into lasting, useful beauty.',paper:'a flat sheet becomes a living bird, showing transformation through skill.',plant:'a bloom opening shows beauty in nature that crafts try to preserve.',pattern:'repetition and rhythm turn nature into order and calm.',mosaic:'small colored pieces come together to create a larger, balanced picture.',pottery:'shaping clay by hand turns a simple material into a useful vessel.',embroidery:'careful stitches build decorative forms on cloth.',landscape:'layered hills and a setting sun show how color and depth create a calm scene.',tatting:'knots and loops transform thread into intricate, durable lace.',shoemaking:'measuring and shaping materials by hand turns them into useful footwear.',woodcarving:'patient cuts reveal forms and patterns hidden in a piece of wood.',cabinetry:'careful joinery makes useful furniture that can last for generations.',scrapbooking:'arranging memories and keepsakes turns personal history into a visual story.',stamping:'repeating inked motifs adds rhythm and decoration to paper.',quilling:'rolled paper strips become detailed pictures through patient shaping.'};
const PR=[['Harmony','Unity between all parts of the work, creating a sense of completeness.'],['Variety','Using several elements of design to hold attention and guide the eye.'],['Balance','Distribution of visual weight. Symmetrical (similar sides), asymmetrical (different but balanced) or radial (around a center).'],['Movement','The path the viewer’s eye takes, along lines, edges, shapes and color.'],['Emphasis','The part that catches attention, made to stand out by contrast.'],['Proportion','Unity when sizes, amounts or numbers relate well, like head size to body.'],['Rhythm','Repeated elements create organized movement, like music or dance. Variety keeps it exciting.'],['Pattern','Repeating an object or symbol all over the work.'],['Repetition','Works with pattern to make art active and creates unity.']];
$('#pgrid').innerHTML=PR.map(p=>`<button class="card flip"><div><span class="fa"><b>${p[0]}</b><small>tap to flip</small></span><span class="fb">${p[1]}</span></div></button>`).join('');
$('#pgrid').onclick=e=>{const f=e.target.closest('.flip');f&&f.classList.toggle('on')};
const FN=[['🎭 Art for Acting','Pursues a certain emotion, to relax or entertain the viewer.'],['💚 Art for Healing','Used by art therapists, psychotherapists and clinical psychologists. Creating becomes a method of curing.'],['✊ Art for Political Change','Early 20th-century art used visual images to bring about legislative change.'],['📢 Art for Propaganda (Commercialism)','Used to subtly influence popular ideas or moods.'],['💬 Art for Communication','Has a goal directed to another person, such as graphics expressing feelings and moods.']];
$('#fgrid').innerHTML=FN.map(f=>`<div class="card reveal"><h4>${f[0]}</h4><p>${f[1]}</p></div>`).join('');

/* Gallery */
const LOCAL_IMAGES={
 'Hattersley_Power_Loom_03_(cropped).jpg':'woven-loom.jpg',
 'Tree_rings.jpg':'tree-rings.jpg',
 '3_tourist_helping_artist_blacksmith_in_finland.JPG':'blacksmith.jpg',
 'Orizuru.jpg':'origami-crane.jpg',
 'Rose.jpg':'rose.jpg',
 'William_Morris_Gallery-001_crop.JPG':'morris-gallery.jpg',
 'Mosaic.jpg':'mosaic.jpg',
 'Pottenbakkersschijf.JPG':'pottery-wheel.jpg',
 'Croatian_embroidery.jpg':'croatian-embroidery.jpg',
 'Sunset.jpg':'sunset.jpg',
 '2021-03-21_DSG0835_butterfly-shaped_handiwork_in_tatting_technique_(high_resolution).jpg':'tatting-lace.jpg',
 'Shoes_and_shoe_making_tools_-_Macedonian_shoemaking_craft.jpg':'shoemaking-tools.jpg',
 'Carving_wood_workshop.jpg':'woodcarving-workshop.jpg',
 'Interieur_Sierkunst.JPG':'historic-cabinetry.jpg',
 'DigitalScrapbookPage.jpg':'digital-scrapbook.jpg',
 'Stempelkarussel.JPG':'rubber-stamps.jpg',
 'Quilled_flowers_sample_quilling_picture.jpg':'paper-quilling.jpg'
};
const commons=(page,artist,license,licenseUrl,alt)=>{
 const filename=decodeURIComponent(new URL(page).pathname.split('/').pop()).replace(/^File:/,'');
 const localImage=LOCAL_IMAGES[filename];
 if(!localImage)throw new Error(`Missing local image mapping for ${filename}`);
 return {src:`assets/images/${localImage}`,page,artist,license,licenseUrl,alt};
};
const GAL=[['Woven Dream','weave','Ad Meskens','A real Hattersley loom shows how warp and weft are woven into cloth.',commons('https://commons.wikimedia.org/wiki/File:Hattersley_Power_Loom_03_(cropped).jpg','Ad Meskens','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/','Hattersley power loom')],
 ['Rings of Time','wood','Arnoldius','A cross-section of a tree trunk shows its annual growth rings.',commons('https://commons.wikimedia.org/wiki/File:Tree_rings.jpg','Arnoldius','CC BY-SA 2.5','https://creativecommons.org/licenses/by-sa/2.5/','Tree rings in a cross-section of a trunk')],
 ['Spark of the Anvil','metal','Wasapl','A blacksmith and visitor work together at a traditional smithy in Finland.',commons('https://commons.wikimedia.org/wiki/File:3_tourist_helping_artist_blacksmith_in_finland.JPG','Wasapl','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/','Blacksmith and visitor working at a smithy')],
 ['Paper Crane','paper','Kinori','A real folded paper crane, a classic form of origami.',commons('https://commons.wikimedia.org/wiki/File:Orizuru.jpg','Kinori','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Origami paper crane')],
 ['Bloom','plant','User:Agguizar','A real rose, photographed as an example of natural form and radial balance.',commons('https://commons.wikimedia.org/wiki/File:Rose.jpg','User:Agguizar','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Rose flower')],
 ['William Morris Gallery','pattern','ProfDEH','The William Morris Gallery in Walthamstow celebrates the designer and the Arts and Crafts movement.',commons('https://commons.wikimedia.org/wiki/File:William_Morris_Gallery-001_crop.JPG','ProfDEH','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/','William Morris Gallery in London')],
 ['Mosaic Garden','mosaic','Plicata','A real mosaic detail from the wall of Wat Xien Thong temple in Luang Prabang, Laos.',commons('https://commons.wikimedia.org/wiki/File:Mosaic.jpg','Plicata','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Mosaic detail at Wat Xien Thong temple')],
 ['Clay in Bloom','pottery','Oriel','A potter’s wheel, used to shape clay into functional vessels.',commons('https://commons.wikimedia.org/wiki/File:Pottenbakkersschijf.JPG','Oriel','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Pottery wheel')],
 ['Stitched Flowers','embroidery','OttawaAC','Croatian embroidery decorates fabric with needle and thread.',commons('https://commons.wikimedia.org/wiki/File:Croatian_embroidery.jpg','OttawaAC','CC BY 3.0','https://creativecommons.org/licenses/by/3.0/','Croatian embroidery')],
 ['Golden Hour','landscape','Ygrek','A real sunset near Gründau, Germany.',commons('https://commons.wikimedia.org/wiki/File:Sunset.jpg','Ygrek','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Sunset near Gründau, Germany')],
 ['Tatting Lace','tatting','Franz van Duns','Handmade lace formed from knots and loops. This butterfly shows the fine detail possible with tatting.',commons('https://commons.wikimedia.org/wiki/File:2021-03-21_DSG0835_butterfly-shaped_handiwork_in_tatting_technique_(high_resolution).jpg','Franz van Duns','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/','Tatted lace butterfly handiwork')],
 ['Shoemaking','shoemaking','Orce Wiki','Shoemaking is the process of making footwear. This photo shows traditional shoes and shoemaking tools.',commons('https://commons.wikimedia.org/wiki/File:Shoes_and_shoe_making_tools_-_Macedonian_shoemaking_craft.jpg','Orce Wiki','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/','Traditional shoes and shoemaking tools')],
 ['Wood Carving','woodcarving','Curved.kiwix','Wood carving shapes wooden objects by cutting and removing material. This photo shows a traditional carving workshop in Sri Lanka.',commons('https://commons.wikimedia.org/wiki/File:Carving_wood_workshop.jpg','Curved.kiwix','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/','Wood carving workshop in Sri Lanka')],
 ['Cabinetry','cabinetry','Carolus','Cabinetry is the skill of making box-shaped furniture with doors and drawers for storage.',commons('https://commons.wikimedia.org/wiki/File:Interieur_Sierkunst.JPG','Carolus','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/','Historic furniture displayed in a museum')],
 ['Scrapbooking','scrapbooking','MamaGeek','Scrapbooking arranges and preserves personal or family history in a book.',commons('https://commons.wikimedia.org/wiki/File:DigitalScrapbookPage.jpg','MamaGeek','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/','Example of a digital scrapbook page')],
 ['Rubber Stamping','stamping','Carl Steinbeisser','Rubber stamping applies ink to a carved or molded rubber image or pattern.',commons('https://commons.wikimedia.org/wiki/File:Stempelkarussel.JPG','Carl Steinbeisser','Public domain','https://creativecommons.org/publicdomain/mark/1.0/','Rotating collection of rubber stamps')],
 ['Quilling','quilling','Inna Dorman','Quilling rolls, shapes, and glues paper strips to create decorative designs.',commons('https://commons.wikimedia.org/wiki/File:Quilled_flowers_sample_quilling_picture.jpg','Inna Dorman','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/','Decorative flowers made with paper quilling')]];
const galleryVisual=g=>g[4]?`<div class="art photo"><img src="${g[4].src}" alt="${g[4].alt}" loading="lazy" decoding="async"></div>`:`<div class="art tilt">${ART[g[1]]}</div>`;
function initGallery(){
 if(initGallery.done)return;
 const cards=GAL.map((g,i)=>`<div class="card pointer" data-i="${i}">${galleryVisual(g)}<h3>${g[0]}</h3><p class="small">${g[4]?`Photo: ${g[4].artist}`:`By ${g[2]}`}</p></div>`).join('');
 $('#ggrid').innerHTML=`<div class="gallery-track"><div class="gallery-track-group">${cards}</div><div class="gallery-track-group" aria-hidden="true">${cards}</div></div>`;
 $('#ggrid').onclick=e=>{const c=e.target.closest('[data-i]');if(!c)return;const g=GAL[c.dataset.i];
  $('#mart').innerHTML=galleryVisual(g);$('#mtext').innerHTML=`<h3>${g[0]}</h3><p><b>${g[4]?'Photo by':'Creator:'}</b> ${g[4]?g[4].artist:g[2]}</p><p>${g[3]}</p><p><b>Meaning:</b> ${MEAN[g[1]]}</p>${g[4]?`<div class="gallery-source"><a href="${g[4].page}" target="_blank" rel="noopener noreferrer">Open original photo citation on Wikimedia Commons ↗</a><button class="copy-source" type="button">Copy link</button><span id="copy-status" role="status" aria-live="polite"></span></div><p class="small"><b>License:</b> <a href="${g[4].licenseUrl}" target="_blank" rel="noopener noreferrer">${g[4].license}</a></p>`:''}`;
  const copyButton=$('.copy-source',$('#mtext'));
  if(copyButton)copyButton.onclick=async()=>{
   const status=$('#copy-status');
   try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(g[4].page);
    else{
     const field=document.createElement('textarea');field.value=g[4].page;field.readOnly=true;field.style.position='fixed';field.style.opacity='0';
     document.body.appendChild(field);field.select();const copied=document.execCommand('copy');field.remove();
     if(!copied)throw new Error('Clipboard access is unavailable');
    }
    status.textContent='Link copied!';
   }catch(error){status.textContent='Could not copy the link. Open the source and copy its address.'}
  };
  $('#modal').classList.add('open')};
 $('#mclose').onclick=()=>$('#modal').classList.remove('open');$('#modal').onclick=e=>e.target.id==='modal'&&$('#modal').classList.remove('open');
 initGallery.done=true;
}

/* References (complete from your module) */
$('#reflist').innerHTML=['Dutton, D. (1990). <i> The difference between art and craft [Radio broadcast]. Radio New Zealand.</i>.','Elsen, A. E. (1981). Purposes of art (4th ed.). Holt, Rinehart and Winston</i>.','Horace. (1906). <i>The book of camping and woodcraft: A guidebook for those who travel in the wilderness. The Outing Publishing Company</i>.','Morris, W. (1880). <i>The beauty of life</i> [Lecture].','Rader, M. (1979). <i>A modern book of esthetics</i> (5th ed.). Holt, Rinehart and Winston.','Art Appreciation module. (n.d.). <i>The difference between aesthetic arts and crafts</i> [Course material].'].map(r=>`<li>${r}</li>`).join('');

/* Team (editable, saved locally) */
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}}};
const av=(id,c)=>`<svg viewBox="0 0 100 100" role="img" aria-label="Default creator avatar"><defs><linearGradient id="avatar-bg-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c}"/><stop offset="1" stop-color="#1f3d2b"/></linearGradient></defs><rect width="100" height="100" fill="url(#avatar-bg-${id})"/><circle cx="50" cy="38" r="17" fill="#fffaf0"/><path d="M17 100c2-24 14-37 33-37s31 13 33 37" fill="#fffaf0"/><circle cx="79" cy="20" r="8" fill="#d6a84f" opacity=".9"/></svg>`;
function pcard(id,name,role,c,asset){
 const image=store.get('img-'+id),savedName=store.get('nm-'+id),savedRole=store.get('rl-'+id);
 const avatar=image?`<img src="${image}" alt="${name}" loading="lazy" decoding="async">`:asset?`<img src="assets/images/${asset}" alt="${name}" loading="lazy" decoding="async">`:av(id,c);
 return `<div class="card pcard"><div class="avatar" id="av-${id}">${avatar}</div><div class="nm" contenteditable id="nm-${id}">${savedName||name}</div><p class="small" contenteditable id="rl-${id}">${savedRole||role}</p></div>`
}
const TEAM=[['m1','Espinosa, Niel','Role: Lead Designer','#b5546b','member1.jpg'],['m2','Canda, Shiela Mae','Role: Developer','#2f6f6a','member2.jpg'],['m3','Gupit, Oswald McSunday ','Role: Researcher','#d6a84f','member3.jpg'],['m4','Patayon, Ravilyn ','Role: Writer','#1f3d2b','member4.jpg'],['m5','Magsanay, Jhonfrixter','Role: Illustrator','#8c5c9e','member5.jpg'],['m6','Cordovez, Estrelita','Role: Presenter','#dbdf22','member6.jpg'],['m7','Salazar, John Dale','Role: Presenter','#2f6f6a','member7.jpg']];
function initTeam(){
 if(initTeam.done)return;
 $('#team-grid').innerHTML=TEAM.map(t=>pcard(...t)).join('');
 $('#inst-grid').innerHTML=pcard('inst','Orejas, Benedict','Art Appreciation Instructor','#6b4a8c','member8.jpg');
 $$('.pcard').forEach(card=>{
  $$('[contenteditable]',card).forEach(el=>el.oninput=()=>store.set(el.id,el.textContent));
 });
 initTeam.done=true;
}

/* ---------- Navigation with curtain transition ---------- */
let cur='home',busy=false;
const transitionEmojis=['🌸','✿','❀','🍃','✦'];
function launchOrigami(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const crane=document.createElement('span');
 crane.className=`flying-origami${Math.random()<.5?' reverse':''}`;
 crane.setAttribute('aria-hidden','true');
 crane.innerHTML='<svg viewBox="0 0 120 90"><path class="origami-wing wing-left" d="M60 42 8 12 42 55 60 51Z" fill="#fffaf0" stroke="#b5546b" stroke-width="2.5" stroke-linejoin="round"/><path class="origami-wing wing-right" d="M60 42 112 12 78 55 60 51Z" fill="#f4dca0" stroke="#8d6b2f" stroke-width="2.5" stroke-linejoin="round"/><path d="m60 42 19 9-19 17-19-17Z" fill="#f4b8c6" stroke="#b5546b" stroke-width="2.5" stroke-linejoin="round"/><path d="m41 51-26 13 7-19 19 6Zm38 0 21-17 10-1-21 18Z" fill="#fffaf0" stroke="#b5546b" stroke-width="2.5" stroke-linejoin="round"/><path d="m60 42 21-23 22-3-18 17-6 18Z" fill="#d6a84f" stroke="#8d6b2f" stroke-width="2.5" stroke-linejoin="round"/><path d="m60 42 21-23m-2 32 6-18M41 51l19 16m0-25-18 9m39 0 21-17" fill="none" stroke="#8d6b2f" stroke-width="1.5" stroke-linecap="round"/></svg>';
 document.body.appendChild(crane);
 setTimeout(()=>crane.remove(),5200);
}
function petalTransition(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 launchOrigami();
 const fragment=document.createDocumentFragment();
 for(let i=0;i<26;i++){
  const petal=document.createElement('span');
  petal.className='transition-petal';
  petal.textContent=transitionEmojis[i%transitionEmojis.length];
  petal.style.left=`${Math.random()*100}vw`;
  petal.style.top=`${25+Math.random()*48}vh`;
  petal.style.setProperty('--drift',`${Math.random()*30-15}vw`);
  petal.style.setProperty('--spin',`${Math.random()*300-150}deg`);
  petal.style.animationDelay=`${Math.random()*.7}s`;
  fragment.appendChild(petal);
  setTimeout(()=>petal.remove(),5100);
 }
 document.body.appendChild(fragment);
}
function go(id,instant){
 if(!$('#'+id)||busy||id===cur&&!instant)return;busy=true;
 const sw=()=>{$$('.page').forEach(p=>p.classList.toggle('active',p.id===id));$$('nav a').forEach(a=>a.classList.toggle('on',a.dataset.go===id));cur=id;
  if(id==='crafts'&&!showCraft.done){showCraft('textile');showCraft.done=true}
  if(id==='gallery')initGallery();
  if(id==='team')initTeam();
  if(id==='games')initGames();
   tilt($('#'+id));syncPetals();scrollTo(0,0);setTimeout(observe,80);stopGuide()};
 if(instant){sw();busy=false;return}
 petalTransition();
 $('#curtain').classList.add('on');
 setTimeout(()=>{sw();$('#curtain').classList.remove('on');setTimeout(()=>busy=false,500)},600);
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(a){e.preventDefault();history.replaceState(null,'','#'+a.dataset.go);go(a.dataset.go)}});

/* Optional spoken navigation and learning guide. */
const voiceButton=$('#voice-toggle');
const voiceGuides={
 home:'Welcome to Likha Atelier. Start with Aesthetics and Craft to learn the difference, explore the craft families, then visit Design, Gallery, and Games. Use the navigation above to move between sections.',
 about:'Aesthetics is the study of beauty and perception. Craft is skill applied by hand to make useful or decorative things. William Morris helped lead the Arts and Crafts movement, bringing beauty and usefulness together.',
 crafts:'Explore five craft families: textile, wood, metal, paper, and plant. Choose a tab to see examples and learn how each material is shaped by skilled hands.',
 design:'Explore principles that organize visual art, including harmony, variety, balance, movement, emphasis, proportion, rhythm, pattern, and repetition. Flip a card to reveal its meaning. Below, learn about the different purposes of art.',
 gallery:'Browse the artwork and craft photographs. The gallery moves automatically; hover over it to pause. Select an image to read about its maker, meaning, and source.',
 artist:'Meet William Morris, the English designer and writer whose patterns and ideas helped shape the Arts and Crafts movement. Look for pattern, rhythm, harmony, and balance in his work.',
 games:'Choose a quiz, memory match, or design-principle game. Read each instruction, then play to review what you have learned.',
 reflect:'This section summarizes why aesthetics and craft matter: skilled making can preserve culture and bring beauty into everyday life.',
 refs:'This page lists the sources and image credits used in the project. Gallery entries include links to the source and license for each photograph.',
 team:'Meet the creators and instructor. Click a name or role to edit it.'
};
let activeGuide=null;
function resetGuideButton(){
 voiceButton.setAttribute('aria-pressed','false');
 voiceButton.textContent='▶ Listen';
 voiceButton.title='Play audio guide for this section';
 activeGuide=null;
}
function speakGuide(section){
 const speech=window.speechSynthesis;
 if(!speech||typeof SpeechSynthesisUtterance==='undefined'||!voiceGuides[section])return;
 speech.cancel();
 const utterance=new SpeechSynthesisUtterance(voiceGuides[section]);
 utterance.rate=.96;
 utterance.pitch=1;
 activeGuide=utterance;
 voiceButton.setAttribute('aria-pressed','true');
 voiceButton.textContent='■ Stop';
 voiceButton.title='Stop the audio guide';
 utterance.onend=()=>{if(activeGuide===utterance)resetGuideButton()};
 utterance.onerror=()=>{if(activeGuide===utterance){resetGuideButton();voiceButton.title='The audio guide could not play. Try again.'}};
 speech.speak(utterance);
}
function stopGuide(){
 if(!activeGuide)return;
 window.speechSynthesis.cancel();
 resetGuideButton();
}
voiceButton.onclick=()=>{
 const speech=window.speechSynthesis;
 if(!speech||typeof SpeechSynthesisUtterance==='undefined'){
  voiceButton.disabled=true;
  voiceButton.title='Audio guide is not supported by this browser';
  return;
 }
 if(activeGuide)stopGuide();
 else speakGuide(cur);
};

/* Optional original chill groove, started only after the visitor opts in. */
const musicButton=$('#music-toggle');
let audioContext=null,musicGain=null,musicStopTimer=0,musicTimer=0,musicPlaying=false,musicStep=0,musicNoise=null;
const melody=[523.25,0,659.25,783.99,0,659.25,587.33,0,523.25,0,783.99,659.25,0,587.33,698.46,0];
const bass=[130.81,130.81,164.81,164.81,174.61,174.61,146.83,146.83];
const chords=[[261.63,329.63,392,493.88],[220,261.63,329.63,392],[174.61,220,261.63,329.63],[196,246.94,293.66,392]];
function playMusicNote(frequency,duration,type,volume,filterFrequency=2400){
 const now=audioContext.currentTime,oscillator=audioContext.createOscillator(),filter=audioContext.createBiquadFilter(),envelope=audioContext.createGain();
 oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,now);
 filter.type='lowpass';filter.frequency.setValueAtTime(filterFrequency,now);
 envelope.gain.setValueAtTime(.0001,now);
 envelope.gain.exponentialRampToValueAtTime(volume,now+.018);
 envelope.gain.exponentialRampToValueAtTime(.0001,now+duration);
 oscillator.connect(filter);filter.connect(envelope);envelope.connect(musicGain);
 oscillator.start(now);oscillator.stop(now+duration+.03);
}
function playMusicNoise(duration,volume,frequency){
 const now=audioContext.currentTime,source=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),envelope=audioContext.createGain();
 source.buffer=musicNoise;filter.type='highpass';filter.frequency.setValueAtTime(frequency,now);
 envelope.gain.setValueAtTime(volume,now);envelope.gain.exponentialRampToValueAtTime(.001,now+duration);
 source.connect(filter);filter.connect(envelope);envelope.connect(musicGain);
 source.start(now);source.stop(now+duration);
}
function playMusicStep(){
 const step=musicStep%16;
 if(melody[step])playMusicNote(melody[step],.24,'triangle',.09,3200);
 if(step%2===0)playMusicNote(bass[(step/2)%bass.length],.3,'sawtooth',.1,420);
 if(step%4===0)chords[Math.floor(step/4)%chords.length].forEach(note=>playMusicNote(note,1.15,'sine',.025,1100));
 if(step%4===0)playMusicNote(115,.16,'sine',.22,180);
 if(step%8===4)playMusicNoise(.14,.08,1200);
 playMusicNoise(.045,step%2===0?.025:.04,6500);
 musicStep++;
}
musicButton.onclick=async()=>{
 const AudioContextType=window.AudioContext||window.webkitAudioContext;
 if(!AudioContextType){musicButton.disabled=true;musicButton.title='Music is not supported by this browser';return}
 if(!audioContext){
  audioContext=new AudioContextType();
  musicGain=audioContext.createGain();
  musicGain.gain.value=0;
  musicGain.connect(audioContext.destination);
  musicNoise=audioContext.createBuffer(1,audioContext.sampleRate,audioContext.sampleRate);
  const noiseData=musicNoise.getChannelData(0);
  for(let i=0;i<noiseData.length;i++)noiseData[i]=Math.random()*2-1;
 }
 clearTimeout(musicStopTimer);
 try{
  await audioContext.resume();
  const now=audioContext.currentTime;
  musicPlaying=!musicPlaying;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setTargetAtTime(musicPlaying ? 0.65 : 0,now,.12);
  musicButton.setAttribute('aria-pressed',String(musicPlaying));
  musicButton.textContent=musicPlaying?'♫ Music on':'♫ Music off';
  musicButton.title=musicPlaying?'Turn cool music off':'Play cool music';
  if(musicPlaying){musicStep=0;playMusicStep();musicTimer=setInterval(playMusicStep,300)}
  else{clearInterval(musicTimer);musicTimer=0;musicStopTimer=setTimeout(()=>audioContext.suspend(),1800)}
 }catch(error){
  clearInterval(musicTimer);musicTimer=0;
  musicPlaying=false;
  musicButton.setAttribute('aria-pressed','false');
  musicButton.textContent='♫ Music unavailable';
  musicButton.title=`Could not start music: ${error.message}`;
 }
};
function observe(){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('show');io.unobserve(x.target)}}),{threshold:.12});$$('.page.active .reveal:not(.show)').forEach(el=>io.observe(el))}

/* ---------- 3D tilt + glow cursor ---------- */
function tilt(root=document){$$('.tilt,.art',root).forEach(el=>{if(el._t)return;el._t=1;
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.04)`});
 el.addEventListener('mouseleave',()=>el.style.transform='')})}
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;$('#glow').style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`},{passive:true});

/* ---------- Falling petals canvas ---------- */
const pc=$('#petals'),px=pc.getContext('2d');let ps=[],petalFrame=0;
function rs(){pc.width=innerWidth;pc.height=innerHeight}rs();addEventListener('resize',rs);
ps=Array.from({length:18},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:4+Math.random()*7,s:.4+Math.random(),a:Math.random()*6,c:['#b5546b','#d6a84f','#6aa38a','#f4b8c6'][Math.random()*4|0]}));
function syncPetals(){
 const active=cur==='home'&&document.visibilityState==='visible'&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(active&&!petalFrame)drawPetals();
 else if(!active&&petalFrame){cancelAnimationFrame(petalFrame);petalFrame=0;px.clearRect(0,0,pc.width,pc.height)}
}
function drawPetals(){
 px.clearRect(0,0,pc.width,pc.height);
 ps.forEach(p=>{p.y+=p.s;p.a+=.02;p.x+=Math.sin(p.a)*.8;if(p.y>pc.height+10){p.y=-10;p.x=Math.random()*pc.width}
  px.save();px.translate(p.x,p.y);px.rotate(p.a);px.globalAlpha=.55;px.fillStyle=p.c;px.beginPath();px.ellipse(0,0,p.r,p.r/2,0,0,7);px.fill();px.restore()});
 petalFrame=requestAnimationFrame(drawPetals);
}
document.addEventListener('visibilitychange',syncPetals);

/* ---------- Title animation ---------- */
$('#title').innerHTML=[...'Likha Atelier'].map((c,i)=>`<span style="--i:${i}">${c===' '?'&nbsp;':c}</span>`).join('');
function burst(){const em=['🌸','✦','🍃','🪡','✨','🎨','❖'];for(let i=0;i<46;i++){const s=document.createElement('span');s.className='bt';s.textContent=em[i%em.length];s.style.left='50vw';s.style.top='50vh';s.style.setProperty('--dx',(Math.random()*90-45)+'vw');s.style.setProperty('--dy',(Math.random()*90-45)+'vh');s.style.animationDelay=Math.random()*.3+'s';document.body.appendChild(s);setTimeout(()=>s.remove(),1900)}}

/* ---------- Games ---------- */
function initGames(){
 if(initGames.done)return;initGames.done=1;
 const G=[['quiz','📝 Quiz'],['memory','🃏 Memory'],['prin','🔎 Name the Principle']];
 $('#gtabs').innerHTML=G.map(g=>`<button class="tab" data-g="${g[0]}">${g[1]}</button>`).join('');
 const sg=k=>{$$('#gtabs .tab').forEach(t=>t.classList.toggle('on',t.dataset.g===k));$$('.gpanel').forEach(p=>p.classList.toggle('on',p.id==='g-'+k))};
 $('#gtabs').onclick=e=>e.target.dataset.g&&sg(e.target.dataset.g);sg('quiz');
 /* quiz */
 const qs=[['The Greek word <i>eisthesis</i>, root of “aesthetics,” means…',['Beauty','Perception','Power'],1,'Eisthesis means perception.'],['Who used the term aesthetics in the 18th century?',['Alexander Baumgarten','William Morris','Horace'],0,'Baumgarten, a German philosopher.'],['The German word <i>Kraft</i>, root of “craft,” means…',['Color','Power or ability','Paper'],1,'Kraft means power or ability.'],['Who initiated the Arts and Crafts movement?',['Elsen','Rader','William Morris'],2,'William Morris began it in 19th-century Europe.'],['Which is a TEXTILE craft?',['Tatting','Marquetry','Quilling'],0,'Tatting makes lace from knots and loops.'],['Marquetry applies pieces of ___ to form designs.',['Metal','Veneer','Straw'],1,'Thin slices of wood called veneer.'],['Both sides of the design look similar. This is…',['Asymmetrical balance','Radial balance','Symmetrical balance'],2,'Symmetrical balance mirrors both sides.'],['Art used by therapists as a method of curing is Art for…',['Healing','Propaganda','Acting'],0,'Art for healing is used in art therapy.']];
 $('#qbox').innerHTML=qs.map((q,i)=>`<div class="q" id="q${i}"><b>${i+1}. ${q[0]}</b>${q[1].map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join('')}<div class="fb2"></div></div>`).join('');
 $('#qcheck').onclick=()=>{let s=0;qs.forEach((q,i)=>{const v=$(`input[name=q${i}]:checked`),b=$('#q'+i),ok=v&&+v.value===q[2];if(ok)s++;b.className='q '+(ok?'right':'wrong');$('.fb2',b).innerHTML=(ok?'✅ Correct! ':'❌ Answer: '+q[1][q[2]]+'. ')+q[3]});
  $('#qscore').textContent=`Score: ${s}/${qs.length} ${s===8?'🎉 Master Crafter!':s>=5?'👏 Nice work!':'📚 Review and try again!'}`;if(s===8)burst()};
 /* memory */
 const mp=[['Weaving','Interlaced yarns'],['Origami','Paper folding'],['Metal casting','Molten metal in a mold'],['Marquetry','Veneer designs'],['Quilling','Rolled paper strips'],['Millinery','Making hats']];
 let first=null,lock=false,moves=0,found=0;
 const cards=shuffle(mp.flatMap((p,i)=>[[p[0],i],[p[1],i]]));
 $('#mem').innerHTML=cards.map((c,i)=>`<button class="mc" data-i="${i}" aria-label="Card"><span>✦</span></button>`).join('');
 $('#mem').onclick=e=>{const b=e.target.closest('.mc');if(!b||lock||b.classList.contains('f')||b.classList.contains('d'))return;
  b.classList.add('f');b.firstChild.textContent=cards[b.dataset.i][0];
  if(!first){first=b;return}moves++;
  if(cards[first.dataset.i][1]===cards[b.dataset.i][1]){[first,b].forEach(x=>{x.classList.remove('f');x.classList.add('d')});found++;first=null;$('#mscore').textContent=`Moves: ${moves} · Pairs: ${found}/6${found===6?' 🎉 Complete!':''}`;if(found===6)burst()}
  else{lock=true;const a=first;first=null;setTimeout(()=>{[a,b].forEach(x=>{x.classList.remove('f');x.firstChild.textContent='✦'});lock=false},900);$('#mscore').textContent=`Moves: ${moves} · Pairs: ${found}/6`}};
 /* principles */
 const pq=shuffle(PR.slice(0,8)),pn=[...PR.map(p=>p[0])];let pi=0,ps2=0;
 $('#pbtns').innerHTML=pn.map(k=>`<button class="tab" data-p="${k}">${k}</button>`).join('');
 const nextP=()=>{$('#pclue').textContent=pi<pq.length?pq[pi][1]:`Finished! ${ps2}/${pq.length} ${ps2>=6?'🎉':'👍'}`;if(pi>=pq.length&&ps2>=6)burst()};nextP();
 $('#pbtns').onclick=e=>{if(!e.target.dataset.p||pi>=pq.length)return;const ok=e.target.dataset.p===pq[pi][0];if(ok)ps2++;$('#pscore').textContent=(ok?'✅ Correct! ':`❌ It was ${pq[pi][0]}. `)+`Score ${ps2}/${pi+1}`;pi++;nextP()};
}

/* ---------- Start ---------- */
const requestedPage=location.hash.slice(1).trim();
const startPage=requestedPage&&document.getElementById(requestedPage)?requestedPage:'home';
go(startPage,true);
launchOrigami();
syncPetals();
