// Source: https://www.ssa.gov/international/coc-docs/states.html
const RAW_STATES = `ALABAMA	AL
ALASKA	AK
AMERICAN SAMOA	AS
ARIZONA	AZ
ARKANSAS	AR
CALIFORNIA	CA
COLORADO	CO
CONNECTICUT	CT
DELAWARE	DE
DISTRICT OF COLUMBIA	DC
FLORIDA	FL
GEORGIA	GA
GUAM	GU
HAWAII	HI
IDAHO	ID
ILLINOIS	IL
INDIANA	IN
IOWA	IA
KANSAS	KS
KENTUCKY	KY
LOUISIANA	LA
MAINE	ME
MARYLAND	MD
MASSACHUSETTS	MA
MICHIGAN	MI
MINNESOTA	MN
MISSISSIPPI	MS
MISSOURI	MO
MONTANA	MT
NEBRASKA	NE
NEVADA	NV
NEW HAMPSHIRE	NH
NEW JERSEY	NJ
NEW MEXICO	NM
NEW YORK	NY
NORTH CAROLINA	NC
NORTH DAKOTA	ND
NORTHERN MARIANA IS	MP
OHIO	OH
OKLAHOMA	OK
OREGON	OR
PENNSYLVANIA	PA
PUERTO RICO	PR
RHODE ISLAND	RI
SOUTH CAROLINA	SC
SOUTH DAKOTA	SD
TENNESSEE	TN
TEXAS	TX
UTAH	UT
VERMONT	VT
VIRGINIA	VA
VIRGIN ISLANDS	VI
WASHINGTON	WA
WEST VIRGINIA	WV
WISCONSIN	WI
WYOMING	WY`;

export const STATES = RAW_STATES.split('\n').map(s => s.split('\t')).map([name, abbr] => abbr);

// Source: https://matchcollege.com/top-majors
//
// From the console:
// copy([...document.querySelectorAll('td > a')].map(s => s.innerText).join('\n'))
const RAW_MAJORS = `Nursing
Liberal Arts
Business Administration
General Studies
Psychology
Biology
Communications
Accounting
Medical Assistant
Social Work
Cosmetology
Mechanical Engineering
Finance
Computer Science
Criminal Justice
Licensed Practical Nurse (LPN)
Advertising and Marketing
Welding
Nursing Assistant
Political Science
Bookkeeping
English
Elementary Education
Auto Mechanic
Law
Sociology
Educational Leadership and Administration
Sports Management
Early Childhood Education
Kinesiology And Exercise Science
Electrical Engineering
Economics
Education
EMT & Paramedic
History
Law and Justice Administration
Math
Healthcare Administration
Information Technology
Esthetician
Civil Engineering
Chemistry
Heating and Air Conditioning (HVAC)
Special Education
Public Health
Medicine
Social Science
Counseling Psychology
Curriculum and Instruction
Electrician
Information Science
Dental Assistant
Public Administration
Bus and Truck Driver
Human Resources
Pharmacy
Family Practice Nurse
Chemical Engineering
Sports Medicine
Computer Networking
Human Services
International Relations
Physical Therapy
Journalism
Organizational Leadership
Physics
Culinary Arts
Guidance Counselor
Information Systems
Biomedical Engineering
Massage Therapy
Fine Arts and Studio Arts
Music
Drama and Theatre Arts
Ultrasound Technician
Radiology Technician
Computer Aided Design (CAD)
Management Science
Anthropology
Physician Assistant
Nail Technician
Paralegal
Biochemistry
Family Studies
Engineering
Diesel Mechanic
Industrial Engineering
Veterinary Assistant
Criminology
International Business
Biomedical Science
Occupational Therapy
Secondary Education
Nursing Administration
Logistics and Supply Chain Management
Medical Insurance Coding
Medical Executive Assistant
Health Information and Medical Records Technology
Environmental Science
Administrative Assistant
Physical Education
Graphic Design
Pharmacy Technician
Dental Hygienist
Fire Science
Spanish Language and Literature
Phlebotomy
Neuroscience
Cinematography And Film
Surgical Technologist
Computer Programming
Industrial Mechanics
Audiology and Speech Pathology
Multimedia
Physical Therapist Assistant
Medical Insurance Biller
Entrepreneurship
Philosophy
Molecular Biology
Geology
International and Global Studies
Audio and Video Production
Ministry
Respiratory Therapy
Animal Science
Statistics
Osteopathy
Software Engineering
Reading Teacher and Literacy Specialist
Dentistry
Mental Health Counseling
Creative Writing
Theology
Architecture
Organizational and Nonprofit Management
Substance Abuse and Addiction Counseling
Aircraft Mechanic
Web Design
Interior Design
Public Relations
Operations Management
Design and Visual Communications
ESL
Industrial Technology
Medical Office Assistant
Manufacturing Engineering Technician
Athletic Training
Clinical Psychology
Real Estate
Engineering Management
Public Policy
Auto Body
Animation
Geography
Office Management and Supervision
Occupational Therapy Assistant (OTA)
Baking And Pastry
Nutrition
Nursing Science
Hospital and Healthcare Facility Management
Exercise Physiology
Child Care
Machinist
Child Development
Medical Lab Technician
Talmudic Studies
Carpentry
Risk Management and Insurance
Aviation
Fashion Merchandising
Higher Education Administration
Fire Prevention
Commercial and Advertising Art
Medical Office Management
Corrections Officer
Dietetics
Organizational Behavior Studies
Medical Technology
Construction Management
Behavioral Science
Forensic Psychology
Parks and Recreation Management
Biotechnology
Forensic Science
Materials Engineering
Optometry
Art History
Systems Engineering
Agriculture
Religious Studies
Sales Manager
Project Management
Fashion Design
Nutrition
Marriage and Family Therapy
Veterinary Medicine
Financial Planning
Middle School Teacher
School Psychology
Christian Counseling
Business & Finance
Medicine & Allied Health
Education
Skilled Trades & Repair Services
Communication & Media
Psychology
Law & Criminal Justice
Administration & Social Services
Liberal Arts and Humanities
Nutrition and Wellness
Computers & Information Technology
Physical & Life Sciences
Engineering & Architecture
Arts & Design
Social Sciences
Animal & Agriculture Studies
Beauty & Hospitality Services`;

export const MAJORS = RAW_MAJORS.split('\n');

// Source (copying and pasting):
// https://www.theedadvocate.org/an-a-z-list-of-u-s-colleges-and-universities/
const RAW_SCHOOLS = `University of Alaska	http://alaska.edu	AK
Alaska Christian College	http://alaskacc.edu	AK
National Park Community College	http://npcc.edu	AK
University of Alaska Fairbanks	http://uaf.edu	AK
University of Arkansas – Fort Smith	http://uafs.edu	AK
Alabama A&M University	http://aamu.edu	AL
Athens State University	http://athens.edu	AL
Auburn University	http://auburn.edu	AL
Auburn University at Montgomery	http://aum.edu	AL
Birmingham-Southern College	http://bsc.edu	AL
Calhoun Community College	http://calhoun.edu	AL
Enterprise State Community College	http://escc.edu	AL
Faulkner State Community College	http://faulknerstate.edu	AL
Gadsden State  Community College	http://gadsdenstate.edu	AL
Huntingdon College	http://huntingdon.edu	AL
Jacksonville State University	http://jsu.edu	AL
Lurleen B. Wallace Community College	http://lbwcc.edu	AL
University of Montevallo	http://montevallo.edu	AL
Northeast Alabama Community College	http://nacc.edu	AL
Northwest-Shoals Community College	http://nwscc.edu	AL
Oakwood University	http://oakwood.edu	AL
Samford University	http://samford.edu	AL
Southeastern Bible College	http://sebc.edu	AL
University of South Alabama	http://southalabama.edu	AL
Trenholm State Technical College	http://trenholmstate.edu	AL
Troy University	http://troy.edu	AL
Tuskegee University	http://tuskegee.edu	AL
University of Alabama	http://ua.edu	AL
University of Alabama at Birmingham	http://uab.edu	AL
University of Alabama in Huntsville	http://uah.edu	AL
University of North Alabama	http://una.edu	AL
Snead State Community College	http://snead.edu	AL
Arkansas Northeastern College	http://anc.edu	AR
Arkansas State University	http://astate.edu	AR
Arkansas Tech University	http://atu.edu	AR
Central Baptist College	http://cbc.edu	AR
Harding University	http://harding.edu	AR
Hendrix College	http://hendrix.edu	AR
Henderson State University	http://hsu.edu	AR
John Brown University	http://jbu.edu	AR
Lyon College	http://lyon.edu	AR
Mid-South Community College	http://midsouthcc.edu	AR
North Arkansas College	http://northark.edu	AR
Northwest Arkansas Community College	http://nwacc.edu	AR
Northwest Technical Institute	http://nwti.edu	AR
Ouachita Baptist University	http://obu.edu	AR
University of the Ozarks	http://ozarks.edu	AR
Phillips Community College U of A	http://pccua.edu	AR
Pulaski Technical College	http://pulaskitech.edu	AR
Southern Arkansas University Magnolia	http://saumag.edu	AR
Southeast Arkansas College	http://seark.edu	AR
University of Arkansas Community College Batesville	http://uaccb.edu	AR
University of Arkansas at Little Rock	http://ualr.edu	AR
University of Arkansas for Medical Sciences	http://uams.edu	AR
University of Arkansas at Pine Bluff	http://uapb.edu	AR
University of Arkansas	http://uark.edu	AR
University of Central Arkansas	http://uca.edu	AR
Williams Baptist College	http://wbcoll.edu	AR
University of Arizona	http://arizona.edu	AZ
Arizona State University	http://asu.edu	AZ
Arizona Western College	http://azwestern.edu	AZ
Bryan University	http://bryanuniversity.edu	AZ
Central Arizona College	http://centralaz.edu	AZ
Glendale Community College	http://gccaz.edu	AZ
Grand Canyon University	http://gcu.edu	AZ
Maricopa Community Colleges	http://maricopa.edu	AZ
Mesa Community College	http://mesacc.edu	AZ
Northern Arizona University	http://nau.edu	AZ
Northland Pioneer  College	http://npc.edu	AZ
University of Phoenix	http://phoenix.edu	AZ
Phoenix College	http://phoenixcollege.edu	AZ
Pima Community College	http://pima.edu	AZ
Prescott College	http://prescott.edu	AZ
Rio Salado College	http://riosalado.edu	AZ
South Mountain Community College	http://southmountaincc.edu	AZ
University of Advancing Technology	http://uat.edu	AZ
Yavapai College	http://yc.edu	AZ
Academy of Arts University	http://academyart.edu	CA
Adance Computing Institute	http://advancedcomputinginstitute.edu	CA
Acupuncture & Integrative Medicine College	http://aimc.edu	CA
Alliant International University	http://alliant.edu	CA
Allied American University	http://allied.edu	CA
Anaheim University	http://anaheim.edu	CA
Angeles College	http://angelescollege.edu	CA
Antioch University Los Angeles	http://antiochla.edu	CA
Argosy University	http://argosy.edu	CA
Art Center College of Design	http://artcenter.edu	CA
The Art Institute	http://artinstitutes.edu	CA
Ashford University	http://ashford.edu	CA
ATI College	http://ati.edu	CA
Antelope Valley College	http://avc.edu	CA
Bakersfield College	http://bakersfieldcollege.edu	CA
Barstow Community College	http://barstow.edu	CA
Berkeley University of California	http://berkeley.edu	CA
Berkeley City College	http://berkeleycitycollege.edu	CA
Brandman University	http://brandman.edu	CA
Butte College	http://butte.edu	CA
Cabrillo College	http://cabrillo.edu	CA
California Institute of the Arts	http://calarts.edu	CA
California Baptist University	http://calbaptist.edu	CA
California Lutheran University	http://callutheran.edu	CA
California Miramar University	http://calmu.edu	CA
California Polytechnic State University	http://calpoly.edu	CA
California State University	http://calstate.edu	CA
California Institute of Technology	http://caltech.edu	CA
Canada College	http://canadacollege.edu	CA
College of the Canyons	http://canyons.edu	CA
California College of the Arts	http://cca.edu	CA
California Community Colleges Chanellor’s Office	http://cccco.edu	CA
City College of San Francisco	http://ccsf.edu	CA
Cerritos College	http://cerritos.edu	CA
Cerro Coso Community College	http://cerrocoso.edu	CA
Claremont Graduate University	http://cgu.edu	CA
Chaffey College	http://chaffey.edu	CA
Chapman University	http://chapman.edu	CA
California Institute of Integral Studies	http://ciis.edu	CA
Citrus College	http://citruscollege.edu	CA
The Claremont Colleges	http://claremont.edu	CA
Claremont McKenna College	http://cmc.edu	CA
Copper Mountain College	http://cmccd.edu	CA
Cogswell Polytechnical College	http://cogswell.edu	CA
College of San Mateo	http://collegeofsanmateo.edu	CA
College of the Desert	http://collegeofthedesert.edu	CA
El Camino College Compton Center	http://compton.edu	CA
Contra Costa College	http://contracosta.edu	CA
College of the Sequoias	http://cos.edu	CA
Crafton Hills College	http://craftonhills.edu	CA
California State University Bakersfield	http://csub.edu	CA
California State University Channel Islands	http://csuci.edu	CA
California State University Dominguez Hills	http://csudh.edu	CA
California State University East Bay	http://csueastbay.edu	CA
Fresno State	http://fresnostate.edu	CA
California State University Long Beach	http://csulb.edu	CA
California State University Monterey Bay	http://csumb.edu	CA
California State University Northridge	http://csun.edu	CA
California State Polytechnic University Pomona	http://csupomona.edu	CA
California State University Sacramento	http://csus.edu	CA
California State University San Bernardino	http://csusb.edu	CA
California State University San Marcos	http://csusm.edu	CA
California State University Stanislaus	http://csustan.edu	CA
Cuesta College	http://cuesta.edu	CA
Cuyamaca College	http://cuyamaca.edu	CA
California Western School of Law San Diego	http://cwsl.edu	CA
Cypress College	http://cypresscollege.edu	CA
DeAnza College	http://deanza.edu	CA
San Joaquin Delta College	http://deltacollege.edu	CA
Dominican University of California	http://dominican.edu	CA
Dominican School of Philosophy and Theology	http://dspt.edu	CA
Diablo Valley College	http://dvc.edu	CA
East Los Angeles College	http://elac.edu	CA
El Camino College	http://elcamino.edu	CA
Ex’pression College	http://expression.edu	CA
Foothill-De Anza Community College District	http://fhda.edu	CA
Fashion Institute of Design & Merchandising	http://fidm.edu	CA
Fielding Graduate University	http://fielding.edu	CA
Foothill College	http://foothill.edu	CA
Fresno Pacific University	http://fresno.edu	CA
Fresno City College	http://fresnocitycollege.edu	CA
Frederick Taylor University	http://ftu.edu	CA
Fullerton  College	http://fullcoll.edu	CA
Fuller Theological Seminary	http://fuller.edu	CA
California State University Fullerton	http://fullerton.edu	CA
Gavilan College	http://gavilan.edu	CA
Golden Gate Baptist Theological Seminary	http://ggbts.edu	CA
Glendale Community College	http://glendale.edu	CA
Gnomon School of Visual Effects	http://gnomon.edu	CA
Columbia College	http://gocolumbia.edu	CA
Golden West College	http://goldenwestcollege.edu	CA
Grossmont College	http://grossmont.edu	CA
Allan Hancock College	http://hancockcollege.edu	CA
Hartnell College	http://hartnell.edu	CA
Henley-Putnam University	http://henley-putnam.edu	CA
Harvey Mudd College	http://hmc.edu	CA
Holy Names University	http://hnu.edu	CA
Humboldt State University	http://humboldt.edu	CA
Humphreys College	http://humphreys.edu	CA
Imperial Valley College	http://imperial.edu	CA
International Sports Sciences Association	http://issaonline.edu	CA
International Technological University	http://itu.edu	CA
Irvine Valley College	http://ivc.edu	CA
William Jessup University	http://jessup.edu	CA
John F. Kennedy University	http://jfku.edu	CA
Keck Graduate Institute	http://kgi.edu	CA
Mount Saint Mary’s College	http://la.edu	CA
Los Angeles Community College District	http://laccd.edu	CA
Los Angeles City College	http://lacitycollege.edu	CA
Los Angeles Harbor College	http://lahc.edu	CA
Los Angeles Mission College	http://lamission.edu	CA
Laney  College	http://laney.edu	CA
Los Angeles Southwest College	http://lasc.edu	CA
La Sierra University	http://lasierra.edu	CA
Las Positas College	http://laspositascollege.edu	CA
Los Angeles Trade-Tech Community College	http://lattc.edu	CA
Laurus College	http://lauruscollege.edu	CA
Los Angeles Valley College	http://lavc.edu	CA
University of La Verne	http://laverne.edu	CA
UCLA School of Law	http://ucla.edu	CA
Long Beach City College	http://lbcc.edu	CA
Life Chiropractic College West	http://lifewest.edu	CA
Loma Linda University	http://llu.edu	CA
Loyola Marymount University	http://lmu.edu	CA
Los Medanos College	http://losmedanos.edu	CA
Los Rios Community College District	http://losrios.edu	CA
Lake Tahoe Community College	http://ltcc.edu	CA
College of Marin	http://marin.edu	CA
Marymount California University	http://marymountcalifornia.edu	CA
The Master’s College	http://masters.edu	CA
Merced Community College	http://mccd.edu	CA
Mills College	http://mills.edu	CA
MiraCosta College	http://miracosta.edu	CA
Modesto Junior College	http://mjc.edu	CA
Mount San Jacinto College	http://msjc.edu	CA
Mount San Antonio College	http://mtsac.edu	CA
Napa Valley College	http://napavalley.edu	CA
Notre Dame de Namur University	http://ndnu.edu	CA
NewSchool of Architecture and Design	http://newschoolarch.edu	CA
Norco College	http://norcocollege.edu	CA
Naval Postgraduate School	http://nps.edu	CA
Ohlone College	http://ohlone.edu	CA
Orange Coast College	http://orangecoastcollege.edu	CA
Otis College of Art and Design	http://otis.edu	CA
Occidental College	http://oxy.edu	CA
University of the Pacific	http://pacific.edu	CA
Pacific College of Oriental Medicine	http://pacificcollege.edu	CA
Palomar College	http://palomar.edu	CA
Pasadena City College	http://pasadena.edu	CA
Pepperdine University	http://pepperdine.edu	CA
Peralta Community College District	http://peralta.edu	CA
Pierce College	http://piercecollege.edu	CA
Pitzer College	http://pitzer.edu	CA
Pacific Lutheran  Theological Seminary	http://plts.edu	CA
Point Loma Nazarene University	http://pointloma.edu	CA
Pomona College	http://pomona.edu	CA
Porterville College	http://portervillecollege.edu	CA
Pacific School of Religion	http://psr.edu	CA
Riverside City College	http://rcc.edu	CA
Riverside Community College District	http://rccd.edu	CA
University of Redlands	http://redlands.edu	CA
College of the Redwoods	http://redwoods.edu	CA
Rio Hondo College	http://riohondo.edu	CA
Rosemead College	http://rosemeadcollege.edu	CA
Santa Ana College	http://sac.edu	CA
Saddleback College	http://saddleback.edu	CA
University of San Diego	http://sandiego.edu	CA
Santa Rosa Junior College	http://santarosa.edu	CA
Santa Barbara City College	http://sbcc.edu	CA
School of Continuing Education	http://sce.edu	CA
Scripps College	http://scrippscollege.edu	CA
Santa Clara University	http://scu.edu	CA
Southern California University of Health Sciences	http://scuhs.edu	CA
San Diego City College	http://sdcity.edu	CA
San Diego Mesa College	http://sdmesa.edu	CA
San Diego State University	http://sdsu.edu	CA
San Francisco State University	http://sfsu.edu	CA
Shasta College	http://shastacollege.edu	CA
The Institute of Buddhist Studies	http://shin-ibs.edu	CA
Sierra College	http://sierracollege.edu	CA
Simpson University	http://simpsonu.edu	CA
College of the Siskiyous	http://siskiyous.edu	CA
San Jose State University	http://sjsu.edu	CA
Starr King School for the Ministry	http://sksm.edu	CA
Skyline College	http://skylinecollege.edu	CA
Santa Monica College	http://smc.edu	CA
San Mateo County Community College	http://smccd.edu	CA
Soka University of America	http://soka.edu	CA
Solano Community College	http://solano.edu	CA
Sonoma State University	http://sonoma.edu	CA
Stanford University	http://stanford.edu	CA
Saint Mary’s College	http://stmarys-ca.edu	CA
Taft College	http://taftcollege.edu	CA
Touro University California	http://tu.edu	CA
University of California Davis	http://ucdavis.edu	CA
University of California Hastings College of the Law	http://uchastings.edu	CA
University of California Irvine	http://uci.edu	CA
University of California Los Angeles	http://ucla.edu	CA
University of California Los Angeles Extension	http://uclaextension.edu	CA
University of California Merced	http://ucmerced.edu	CA
University of California	http://ucop.edu	CA
University of California Press	http://ucpress.edu	CA
University of California Riverside	http://ucr.edu	CA
University of California Santa Barbara	http://ucsb.edu	CA
University of California Santa Cruz	http://ucsc.edu	CA
University of California Santa Cruz Silicon Valley Extension	http://ucsc-extension.edu	CA
University of California San Diego	http://ucsd.edu	CA
University of California San Francisco	http://ucsf.edu	CA
University of California	http://universityofcalifornia.edu	CA
University of the Pacific	http://uop.edu	CA
University of Southern California	http://usc.edu	CA
University of San Francisco	http://usfca.edu	CA
San Bernardino Valley College	http://valleycollege.edu	CA
Ventura College	http://venturacollege.edu	CA
Victor Valley College	http://vvc.edu	CA
West Coast Baptist College	http://wcbc.edu	CA
Western University of Health Sciences	http://westernu.edu	CA
Westmont College	http://westmont.edu	CA
West Valley College	http://westvalley.edu	CA
West Hills Community College District	http://whccd.edu	CA
Whittier College	http://whittier.edu	CA
West Los Angeles College	http://wlac.edu	CA
Yuba Community College District	http://yccd.edu	CA
Yosemite Community College District	http://yosemite.edu	CA
Unitek College	http://unitekcollege.edu	CA
Vanguard University	http://vanguard.edu	CA
Southwestern College	http://swcc.edu	CA
Monterey Institute of International Studies	http://miis.edu	CA
Adams State University	http://adams.edu	CO
Auraria Higher Education Center	http://ahec.edu	CO
Aims Community College	http://aims.edu	CO
Arapahoe Community College	http://arapahoe.edu	CO
Community College of Aurora	http://ccaurora.edu	CO
Community College of Denver	http://ccd.edu	CO
Colorado Heights University	http://chu.edu	CO
University of Colorado Boulder	http://colorado.edu	CO
Colorado College	http://coloradocollege.edu	CO
Colorado Mesa University	http://coloradomesa.edu	CO
Colorado State University	http://colostate.edu	CO
Colorado State University-Pueblo	http://colostate-pueblo.edu	CO
University of Denver	http://du.edu	CO
Fort Lewis College	http://fortlewis.edu	CO
Front Range Community College	http://frontrange.edu	CO
Jones International University	http://jiu.edu	CO
Colorado School of Mines	http://mines.edu	CO
Metropolitan State University of Denver	http://msudenver.edu	CO
Naropa University	http://naropa.edu	CO
Pikes Peak Community College	http://ppcc.edu	CO
Pueblo Community College	http://pueblocc.edu	CO
Redstone College	http://redstone.edu	CO
Regis University	http://regis.edu	CO
University of the Rockies	http://rockies.edu	CO
Red Rocks Community College	http://rrcc.edu	CO
William Howard Taft University	http://taft.edu	CO
University Corporation for Atmospheric Research	http://ucar.edu	CO
University of Colorado Colorado Springs	http://uccs.edu	CO
University of Colorado Denver	http://ucdenver.edu	CO
University of Northern Colorado	http://unco.edu	CO
University of Colorado	http://cu.edu	CO
Western State Colorado University	http://western.edu	CO
Albertus Magnus College	http://albertus.edu	CT
Asnuntuck Community College	http://asnuntuck.edu	CT
Connecticut College	http://conncoll.edu	CT
Eastern Connecticut State University	http://easternct.edu	CT
Fairfield University	http://fairfield.edu	CT
Goodwin College	http://goodwin.edu	CT
University of Hartford	http://hartford.edu	CT
Hartford Seminary	http://hartsem.edu	CT
University of New Haven	http://newhaven.edu	CT
Queens University of Charlotte	http://quinnipiac.edu	CT
Quinebaug Valley Community College	http://qvcc.edu	CT
Sacred Heart University	http://sacredheart.edu	CT
Southern Connecticut State University	http://southernct.edu	CT
Three Rivers Community College	http://threerivers.edu	CT
Trinity College	http://trincoll.edu	CT
Tunxis Community College	http://tunxis.edu	CT
University of Connecticut Health Center	http://uchc.edu	CT
University of Connecticut	http://uconn.edu	CT
University of Saint Joseph Connecticut	http://usj.edu	CT
Western Connecticut State University	http://wcsu.edu	CT
Wesleyan University	http://wesleyan.edu	CT
Yale University	http://yale.edu	CT
American University	http://american.edu	DC
Carnegie Institution for Science	http://carnegiescience.edu	DC
The Catholic University of America	http://cua.edu	DC
Gallaudet University	http://gallaudet.edu	DC
Georgetown University	http://georgetown.edu	DC
The George Washington University	http://gwu.edu	DC
Howard University	http://howard.edu	DC
Johns Hopkins School of Advanced International Studies	http://sais-jhu.edu	DC
University of California Washington Center	http://ucdc.edu	DC
University of the District of Columbia	http://udc.edu	DC
Delaware State University	http://desu.edu	DE
Delaware Technical Community College	http://dtcc.edu	DE
Goldey-Beacom College	http://gbc.edu	DE
University of Delaware	http://udel.edu	DE
Wesley College	http://wesley.edu	DE
Wilmington University	http://wilmu.edu	DE
Carlos Albizu University	http://albizu.edu	FL
Acupuncture Massage College	http://amcollege.edu	FL
Atlantic Institute of Oriental Medicine	http://atom.edu	FL
Barry University	http://barry.edu	FL
Broward College	http://broward.edu	FL
College of Central Florida	http://cf.edu	FL
Chipola College	http://chipola.edu	FL
Bethune-Cookman University	http://cookman.edu	FL
Dade Medical College	http://dadmedical.edu	FL
Daytona State College	http://daytonastate.edu	FL
Eckerd College	http://eckerd.edu	FL
Edison State College	http://edison.edu	FL
Embry-Riddle Aeronautical University	http://erau.edu	FL
Everglades University	http://evergladesuniversity.edu	FL
Florida Atlantic University	http://fau.edu	FL
Florida Gulf Coast University	http://fgcu.edu	FL
Florida Institute of Technology	http://fit.edu	FL
Florida International University	http://fiu.edu	FL
Flagler College	http://flagler.edu	FL
Florida Southern College	http://flsouthern.edu	FL
Florida National University	http://fnu.edu	FL
Florida State College at Jacksonville	http://fscj.edu	FL
Florida State University	http://fsu.edu	FL
Gulf Coast State College	http://gulfcoast.edu	FL
Hillsborough Community College	http://hccfl.edu	FL
Jacksonville University	http://ju.edu	FL
Keiser University	http://keiseruniversity.edu	FL
Loraines Academy Incorporated	http://lorainesacademy.edu	FL
Lake Sumter State College	http://lssc.edu	FL
Lynn University	http://lynn.edu	FL
Millennia Atlantic University	http://maufl.edu	FL
Miami Dade College	http://mdc.edu	FL
University of Miami	http://miami.edu	FL
Miami International University of Art and Design	http://mymiu.edu	FL
New College of Florida	http://ncf.edu	FL
North Florida Community College	http://nfcc.edu	FL
Nova Southeastern University	http://nova.edu	FL
National University of Health Sciences	http://nuhs.edu	FL
Northwest Florida State College	http://nwfsc.edu	FL
Palm Beach State College	http://palmbeachstate.edu	FL
Palm Beach Atlantic University	http://pba.edu	FL
Pensacola State College	http://pensacolastate.edu	FL
Pasco-Hernando State College	http://phsc.edu	FL
Ringling College of Art and Design	http://ringling.edu	FL
Rollins College	http://rollins.edu	FL
Saint Leo University	http://saintleo.edu	FL
State College of Florida	http://scf.edu	FL
Seminole State College of Florida	http://seminolestate.edu	FL
Santa Fe College	http://sfcollege.edu	FL
South Florida State College	http://southflorida.edu	FL
Space Coast Health Institute	http://spacecoast.edu	FL
Saint Petersburg College	http://spcollege.edu	FL
Stetson University	http://stetson.edu	FL
Saint Thomas University	http://stu.edu	FL
Saint Vincent de Paul Regional Seminary	http://svdp.edu	FL
Traviss Career Center	http://traviss.edu	FL
University of Central Florida	http://ucf.edu	FL
University of Florida	http://ufl.edu	FL
University of North Florida	http://unf.edu	FL
University of South Florida	http://usf.edu	FL
University of South Florida Sarasota-Manatee	http://usfsm.edu	FL
University of South Florida Saint Petersburg	http://usfsp.edu	FL
University of Tampa	http://ut.edu	FL
University of West Florida	http://uwf.edu	FL
Valencia College	http://valenciacollege.edu	FL
Warner University	http://warner.edu	FL
Webber International University	http://webber.edu	FL
Agnes Scott College	http://agnesscott.edu	GA
Albany Technical College	http://albanytech.edu	GA
Armstrong Atlantic State University	http://armstrong.edu	GA
Atlanta Technical College	http://atlantatech.edu	GA
Atlanta Metropolitan State College	http://atlm.edu	GA
Berry College	http://berry.edu	GA
Carver College	http://carver.edu	GA
Child Care Education Institute	http://cceionline.edu	GA
Central Georgia Technical College	http://centralgatech.edu	GA
Clayton State University	http://clayton.edu	GA
Columbus State University	http://columbusstate.edu	GA
Columbus Technical College	http://columbustech.edu	GA
Covenant College	http://covenant.edu	GA
Dalton State	http://daltonstate.edu	GA
Darton State College	http://darton.edu	GA
East Georgia State College	http://ega.edu	GA
Emory University	http://emory.edu	GA
Georgia Institute of Technology	http://gatech.edu	GA
Georgia College	http://gcsu.edu	GA
Georgia Southern University	http://georgiasouthern.edu	GA
Georgia Gwinnett College	http://ggc.edu	GA
Georgia Perimeter College	http://gpc.edu	GA
Augusta University	http://augusta.edu	GA
Georgia State University	http://gsu.edu	GA
Georgia South Western State University	http://gsw.edu	GA
Interactive College of Technology	http://ict.edu	GA
Atlanta’s John Marshall Law School	http://johnmarshall.edu	GA
Kennesaw State University	http://kennesaw.edu	GA
Lanier Technical College	http://laniertech.edu	GA
Life University	http://life.edu	GA
Mercer University	http://mercer.edu	GA
Middle Georgia State College	http://mga.edu	GA
Morehouse College	http://morehouse.edu	GA
Morehouse School of Medicine	http://msm.edu	GA
North Georgia Technical College	http://northgatech.edu	GA
Oglethorpe University	http://oglethorpe.edu	GA
Okefenokee Technical College	http://okefenokeetech.edu	GA
Paine College	http://paine.edu	GA
Pfeiffer University	http://pfeiffer.edu	GA
Piedmont College	http://piedmont.edu	GA
Reinhardt University	http://reinhardt.edu	GA
Savannah State University	http://savannahstate.edu	GA
Savannah College of Art and Design	http://scad.edu	GA
Shorter University	http://shorter.edu	GA
Southeastern Technical College	http://southeasterntech.edu	GA
Spelman College	http://spelman.edu	GA
Southern Polytechnic State University	http://spsu.edu	GA
Thomas University	http://thomasu.edu	GA
University of Georgia	http://uga.edu	GA
University of North Georgia	http://ung.edu	GA
University System of Georgia	http://usg.edu	GA
Valdosta State University	http://valdosta.edu	GA
University of West Georgia	http://westga.edu	GA
Wiregrass Georgia Technical College	http://wiregrass.edu	GA
Brigham Young University Hawaii	http://byuh.edu	HI
Chaminade University	http://chaminade.edu	HI
University of Hawaii at Manoa	http://hawaii.edu	HI
Mid-Pacific Institute	http://midpac.edu	HI
AIB College of Business	http://aib.edu	IA
Central College	http://central.edu	IA
Coe College	http://coe.edu	IA
Cornell College	http://cornellcollege.edu	IA
Des Moines Area Community College	http://dmacc.edu	IA
Dordt College	http://dordt.edu	IA
Drake University	http://drake.edu	IA
Divine Word College	http://dwci.edu	IA
Eastern Iowa Community Colleges	http://eicc.edu	IA
Grinnell College	http://grinnell.edu	IA
Hawkeye Community College	http://hawkeyecollege.edu	IA
Iowa State University	http://iastate.edu	IA
Iowa Central Community College	http://iowacentral.edu	IA
Iowa Wesleyan College	http://iwc.edu	IA
Iowa Western Community College	http://iwcc.edu	IA
Kaplan University	http://kaplanuniversity.edu	IA
Kirkwood Community College	http://kirkwood.edu	IA
La’ James College	http://lajames.edu	IA
Loras College	http://loras.edu	IA
Luther College	http://luther.edu	IA
Maharishi University of Management	http://mum.edu	IA
Northeast Iowa Community  College	http://nicc.edu	IA
Palmer College of Chiropractic	http://palmer.edu	IA
Saint Ambrose University	http://sau.edu	IA
Simpson College	http://simpson.edu	IA
Southwestern Community College	http://swcciowa.edu	IA
Univeristy of Iowa	http://uiowa.edu	IA
Upper Iowa University	http://uiu.edu	IA
University of Northern Iowa	http://uni.edu	IA
Wartburg College	http://wartburg.edu	IA
Waldorf College	http://waldorf.edu	IA
Boise State University	http://boisestate.edu	ID
Brigham Young University Idaho	http://byui.edu	ID
The College of Idaho	http://collegeofidaho.edu	ID
College of Southern Idaho	http://csi.edu	ID
Idaho State University	http://isu.edu	ID
University of Idaho	http://uidaho.edu	ID
Augustana College	http://augustana.edu	IL
Aurora University	http://aurora.edu	IL
Benedictine University	http://ben.edu	IL
Bradley University	http://bradley.edu	IL
City Colleges of Chicago	http://ccc.edu	IL
The University of Chicago Booth School of Business	http://chicagobooth.edu	IL
College of Lake County	http://clcillinois.edu	IL
College of DuPage	http://cod.edu	IL
Columbia College Chicago	http://colum.edu	IL
Danville Area Community College	http://dacc.edu	IL
DePaul University	http://depaul.edu	IL
Dominican University	http://dom.edu	IL
Eastern Illinois University	http://eiu.edu	IL
Elmhurst College	http://elmhurst.edu	IL
Governors State	http://govst.edu	IL
Greenville College	http://greenville.edu	IL
The Hadley School for the Blind	http://hadley.edu	IL
Harper College	http://harpercollege.edu	IL
Heartland Community College	http://heartland.edu	IL
Illinois Central College	http://icc.edu	IL
Illinois College of Optometry	http://ico.edu	IL
Illinois Institute of Technology	http://iit.edu	IL
University of Illinois at Urbana-Champaign	http://illinois.edu	IL
Illinois State University	http://illinoisstate.edu	IL
Illinois Mathematics and Science Academy	http://imsa.edu	IL
Illinois Valley Community College	http://ivcc.edu	IL
Illinois Wesleyan University	http://iwu.edu	IL
John A. Logan College	http://jalc.edu	IL
Joliet Junior College	http://jjc.edu	IL
The John Marshall Law School	http://jmls.edu	IL
Judson University	http://judsonu.edu	IL
Kaskaskia College	http://kaskaskia.edu	IL
Kankakee Community College	http://kcc.edu	IL
IIT Chicago-Kent College of Law	http://iit.edu	IL
Kishwaukee College	http://kishwaukeecollege.edu	IL
Knox College	http://knox.edu	IL
Lake Forest College	http://lakeforest.edu	IL
Lakeview College of Nursing	http://lakeviewcol.edu	IL
Lewis and Clark Community College	http://lc.edu	IL
Lewis University	http://lewisu.edu	IL
Lincoln Land Community College	http://llcc.edu	IL
Loyola University Chicago	http://luc.edu	IL
Midwestern Career College	http://mccollege.edu	IL
McHenry County College	http://mchenry.edu	IL
McKendree University	http://mckendree.edu	IL
Midwestern University	http://midwestern.edu	IL
Monmouth College	http://monmouthcollege.edu	IL
Moraine Valley Community College	http://morainevalley.edu	IL
Morton College	http://morton.edu	IL
Northeastern Illinois University	http://neiu.edu	IL
Northern Illinois University	http://niu.edu	IL
National Louis University	http://nl.edu	IL
North Park University	http://northpark.edu	IL
Northwestern University	http://northwestern.edu	IL
Oakton Community College	http://oakton.edu	IL
Olivet Nazarene University	http://olivet.edu	IL
Chicago ORT Technical Institute	http://ortchicagotech.edu	IL
Parkland College	http://parkland.edu	IL
Prairie State College	http://prairiestate.edu	IL
Principia College	http://principiacollege.edu	IL
Resurrection University	http://resu.edu	IL
Robert Morris University Illinois	http://robertmorris.edu	IL
Rockford University	http://rockford.edu	IL
Rock Valley College	http://rockvalleycollege.edu	IL
Roosevelt University	http://roosevelt.edu	IL
Rosalind Franklin University	http://rosalindfranklin.edu	IL
Saint Anthony College of Nursing	http://sacn.edu	IL
School of the Art Institute of Chicago	http://saic.edu	IL
Saint Francis Medical Center College of Nursing	http://sfmccon.edu	IL
Shawnee Community College	http://shawneecc.edu	IL
Southeastern Illinois College	http://sic.edu	IL
Southern Illinois University	http://siu.edu	IL
Southern Illinois University Edwardsville	http://siue.edu	IL
Spoon River College	http://src.edu	IL
South Suburban College	http://ssc.edu	IL
University of Saint Francis	http://stfrancis.edu	IL
Southwestern Illinois College	http://swic.edu	IL
Saint Xavier University	http://scu.edu	IL
Trinity Christian College	http://trnty.edu	IL
University of Chicago	http://uchicago.edu	IL
University of Illinois at Chicago	http://uic.edu	IL
University of Illinois	http://uillinois.edu	IL
University of Illinois Springfield	http://uis.edu	IL
University of Illinois at Urbana-Champaign	http://illinois.edu	IL
Waubonsee Community College	http://waubonsee.edu	IL
Wheaton College	http://wheaton.edu	IL
Western Illinois University	http://wiu.edu	IL
Saint John’s College	http://stjohnscollegespringfield.edu	Ill
Anabaptist Mennonite Biblical Seminary	http://ambs.edu	IN
Anderson University	http://anderson.edu	IN
Bethel College Indiana	http://bethelcollege.edu	IN
Brown Mackie College	http://brownmackie.edu	IN
Ball State University	http://bsu.edu	IN
Butler University	http://butler.edu	IN
DePauw University	http://depauw.edu	IN
Earlham College	http://earlham.edu	IN
University of Evansville	http://evansville.edu	IN
Goshen College	http://goshen.edu	IN
Grace College and Seminary	http://grace.edu	IN
Hanover College	http://hanover.edu	IN
Harrison College	http://harrison.edu	IN
Holy Cross College	http://hcc-nd.edu	IN
Indiana University	http://indiana.edu	IN
Indiana State University	http://indstate.edu	IN
Indiana Wesleyan University	http://indwes.edu	IN
Indiana University – Purdue University Fort Wayne	http://ipfw.edu	IN
Indiana University	http://iu.edu	IN
Indiana University Bloomington	http://iub.edu	IN
Indiana University East	http://iue.edu	IN
Indiana University Northwest	http://iun.edu	IN
Indiana University – Purdue University Indianapolis	http://iupui.edu	IN
Indiana University Southeast	http://ius.edu	IN
Indiana University South Bend	http://iusb.edu	IN
Ivy Tech Community College	http://ivytech.edu	IN
Manchester University	http://manchester.edu	IN
Marian University Indianapolis	http://marian.edu	IN
University of Notre Dame	http://nd.edu	IN
Oakland City University	http://oak.edu	IN
Purdue University North Central	http://pnc.edu	IN
Purdue University	http://purdue.edu	IN
Purdue University Calumet	http://purduecal.edu	IN
Rose-Hulman Institute of Technology	http://rose-hulman.edu	IN
Saint Mary’s College	http://saintmarys.edu	IN
Trine University	http://trine.edu	IN
University of Indianapolis	http://uindy.edu	IN
University of Southern Indiana	http://usi.edu	IN
Valparaiso University	http://valpo.edu	IN
Wabash College	http://wabash.edu	IN
Benedictine College	http://benedictine.edu	KS
Butler Community College	http://butlercc.edu	KS
Emporia State University	http://emporia.edu	KS
Fort Hays State University	http://fhsu.edu	KS
Flint Hills Technical College	http://fhtc.edu	KS
Fort Scott Community College	http://fortscott.edu	KS
Garden City Community College	http://gcccks.edu	KS
Hesston College	http://hesston.edu	KS
Highland Community College	http://highlandcc.edu	KS
Johnson County Community College	http://jccc.edu	KS
Kansas City Kansas Community College	http://kckcc.edu	KS
Kansas State University	http://k-state.edu	KS
The University of Kansas	http://ku.edu	KS
McPherson College	http://mcpherson.edu	KS
Neosho County Community College	http://neosho.edu	KS
Newman University	http://newmanu.edu	KS
Pittsburg State University	http://pittstate.edu	KS
Saint Paul School of Theology and Ministry	http://spst.edu	KS
Sterling College	http://sterling.edu	KS
University of Saint Mary	http://stmary.edu	KS
Washburn University	http://washburn.edu	KS
Washburn University School of Law	http://washburnlaw.edu	KS
Wichita State University	http://wichita.edu	KS
Asbury University	http://asbury.edu	KY
Bellarmine University	http://bellarmine.edu	KY
Berea College	http://berea.edu	KY
Centre College	http://centre.edu	KY
Eastern Kentucky University	http://eku.edu	KY
Frontier Nursing University	http://frontier.edu	KY
Georgetown College	http://georgetowncollege.edu	KY
Kentucky Community and Technical College System	http://kctcs.edu	KY
Kentucky Christian University	http://kcu.edu	KY
Kentucky State University	http://kysu.edu	KY
Lindsey Wilson College	http://lindsey.edu	KY
The University of Louisville	http://louisville.edu	KY
Midway College	http://midway.edu	KY
Morehead State University	http://moreheadstate.edu	KY
Murray State University	http://murraystate.edu	KY
Northern Kentucky University	http://nku.edu	KY
The Southern Baptist Theological Seminary	http://sbts.edu	KY
Saint Catharine College	http://sccky.edu	KY
Sullivan University	http://sullivan.edu	KY
University of the Cumberlands	http://ucumberlands.edu	KY
Western Kentucky University	http://wku.edu	KY
Bossier Parish Community College	http://bpcc.edu	LA
Centenary College of Louisiana	http://centenary.edu	LA
Louisiana Tech University	http://latech.edu	LA
Louisiana Culinary Institute	http://lci.edu	LA
University of Louisiana Lafayette	http://louisiana.edu	LA
Loyola University New Orleans	http://loyno.edu	LA
Louisiana State University	http://lsu.edu	LA
Louisiana State University – Eunice	http://lsue.edu	LA
LSU Health Sciences Center – New Orleans	http://lsuhsc.edu	LA
LSU Health Sciences Center – New Orleans	http://lsuhscshreveport.edu	LA
Louisiana State University System	http://lsusystem.edu	LA
Nicholls State University	http://nicholls.edu	LA
New Orleans Baptist Theological Seminary	http://nobts.edu	LA
Nunez Community College	http://nunez.edu	LA
 Southeastern Louisiana University	http://southeastern.edu	LA
Southern University	http://subr.edu	LA
Tulane University	http://tulane.edu	LA
University of Louisiana at Monroe	http://ulm.edu	LA
University of New Orleans	http://uno.edu	LA
Xavier University of Louisiana	http://xula.edu	LA
Amherst College	http://amherst.edu	MA
Assumption College	http://assumption.edu	MA
Babson College	http://babson.edu	MA
Boston College	http://bc.edu	MA
Bentley University	http://bentley.edu	MA
Berklee College of Music	http://berklee.edu	MA
Berkshire Community College	http://berkshirecc.edu	MA
The Boston Conservatory	http://bostonconservatory.edu	MA
Brandeis University	http://brandeis.edu	MA
Bridgewater State University	http://bridgew.edu	MA
Boston University	http://bu.edu	MA
Cambridge College	http://cambridgecollege.edu	MA
Clark University	http://clarku.edu	MA
Curry College	http://curry.edu	MA
Elms College	http://elms.edu	MA
Emerson College	http://emerson.edu	MA
Emmanuel College	http://emmanuel.edu	MA
Endicott College	http://endicott.edu	MA
Fitchburg State University	http://fitchburgstate.edu	MA
Framingham State University	http://framingham.edu	MA
Gordon Conwell Theological Seminary	http://gordonconwell.edu	MA
Gordon College	http://gordon.edu	MA
Hampshire College	http://hampshire.edu	MA
Harvard University	http://harvard.edu	MA
Harvard Business School	http://hbs.edu	MA
College of the Holy Cross	http://holycross.edu	MA
Lesley University	http://lesley.edu	MA
Massachusetts Maritime Academy	http://maritime.edu	MA
Massachusetts Department of Higher Education	http://mass.edu	MA
Massachusetts College of Art and Design	http://massart.edu	MA
MassBay Community College	http://massbay.edu	MA
Marine Biological Laboratory	http://mbl.edu	MA
Merrimack Education Center	http://mec.edu	MA
Merrimack College	http://merrimack.edu	MA
MGH Institute of Health Professions	http://mghihp.edu	MA
Milton Academy	http://milton.edu	MA
Massachusetts Institute of Technology	http://mit.edu	MA
Montserrat College of Art	http://montserrat.edu	MA
Mount Ida College	http://mountida.edu	MA
Mount Holyoke College	http://mtholyoke.edu	MA
Middlesex Community College	http://mxcc.edu	MA
Middlesex School	http://mxschool.edu	MA
North Bennet Street School	http://nbss.edu	MA
New England Law – Boston	http://nesl.edu	MA
Northeastern University	http://northeastern.edu	MA
Olin College of Engineering	http://olin.edu	MA
Salem State University	http://salemstate.edu	MA
Simmons College	http://simmons.edu	MA
Smith College	http://smith.edu	MA
Spa Tech Institute	http://spatech.edu	MA
Springfield College	http://springfieldcollege.edu	MA
Springfield Technical Community College	http://stcc.edu	MA
Suffolk University	http://suffolk.edu	MA
Boston Architectural College	http://the-bac.edu	MA
Tufts University	http://tufts.edu	MA
University of Massachusetts Amherst	http://umass.edu	MA
University of Massachusetts Dartmouth	http://umassd.edu	MA
University of Massachusetts Medical School	http://umassmed.edu	MA
University of Massachusetts	http://umassp.edu	MA
University of Massachusetts Boston	http://umb.edu	MA
University of Massachusetts Lowell	http://uml.edu	MA
Wellesley College	http://wellesley.edu	MA
Wheaton College, Norton	http://wheatoncollege.edu	MA
Wheelock College	http://wheelock.edu	MA
Williams College	http://williams.edu	MA
Western New England University	http://wne.edu	MA
Worcester State University	http://worcester.edu	MA
Worcester Polytechnic Institute	http://wpi.edu	MA
Anne Arundel Community College	http://aacc.edu	MD
Baltimore City Community College	http://bccc.edu	MD
Bowie State University	http://bowiestate.edu	MD
Carroll Community College	http://carrollcc.edu	MD
The Community College of Baltimore County	http://ccbcmd.edu	MD
Chesapeake College	http://chesapeake.edu	MD
Coppin State University	http://coppin.edu	MD
College of Southern Maryland	http://csmd.edu	MD
Frederick Community College	http://frederick.edu	MD
Frostburg State University	http://frostburg.edu	MD
Garrett College	http://garrettcollege.edu	MD
Goucher College	http://goucher.edu	MD
Hagerstown Community  College	http://hagerstowncc.edu	MD
Harford Community College	http://harford.edu	MD
Hood College	http://hood.edu	MD
Howard Community College	http://howardcc.edu	MD
Johns Hopkins Bloomberg School of Public Health	http://jhsph.edu	MD
Johns Hopkins University	http://jhu.edu	MD
Loyola University Maryland	http://loyola.edu	MD
Montgomery Blair High School	http://mbhs.edu	MD
McDaniel College	http://mcdaniel.edu	MD
Maryland Institute College of Art	http://mica.edu	MD
Montgomery College	http://montgomerycollege.edu	MD
Mount Saint Mary’s University	http://msmary.edu	MD
Maryland University of Integrative Health	http://muih.edu	MD
Prince George’s Community College	http://pgcc.edu	MD
Salisbury University	http://salisbury.edu	MD
Sojourner-Douglass College	http://sdc.edu	MD
Saint Mary’s College of Maryland	http://smcm.edu	MD
Saint James School	http://stjames.edu	MD
Towson University	http://towson.edu	MD
University of  Baltimore	http://ubalt.edu	MD
University of Maryland	http://umaryland.edu	MD
University of  Maryland Baltimore County	http://umbc.edu	MD
University of Maryland	http://umd.edu	MD
University of Maryland University College	http://umuc.edu	MD
University System of Maryland	http://usmd.edu	MD
United States Naval Academy	http://usna.edu	MD
Washington College	http://washcoll.edu	MD
Wor-Wic Community College	http://worwic.edu	MD
Saint John’s College	http://sjc.edu	MD
Bates College	http://bates.edu	ME
Bowdoin College	http://bowdoin.edu	ME
Central Maine Community College	http://cmcc.edu	ME
College of the Atlantic	http://coa.edu	ME
Colby College	http://colby.edu	ME
Husson University	http://husson.edu	ME
Maine Maritime Academy	http://mainemaritime.edu	ME
Northern Maine Community College	http://nmcc.edu	ME
Saint Joseph’s College	http://sjcme.edu	ME
Southern Maine Community College	http://smccme.edu	ME
University of Maine	http://umaine.edu	ME
University of Maine Fort Kent	http://umfk.edu	ME
University of Maine at Presque Isle	http://umpi.edu	ME
University of New England	http://une.edu	ME
Unity College	http://unity.edu	ME
York County Community College	http://yccc.edu	ME
University of Main at Augusta	http://uma.edu	ME
Adrian College	http://adrian.edu	MI
Albion College	http://albion.edu	MI
Alma College	http://alma.edu	MI
Alpena Community College	http://alpenacc.edu	MI
Andrews University	http://andrews.edu	MI
Aquinas College	http://aquinas.edu	MI
Baker College	http://baker.edu	MI
Bay College	http://baycollege.edu	MI
Calvin College	http://calvin.edu	MI
Central Michigan University	http://cmich.edu	MI
College for Creative Studies	http://collegeforcreativestudies.edu	MI
Cornerstone University	http://cornerstone.edu	MI
Davenport University	http://davenport.edu	MI
Delta College	http://delta.edu	MI
Douglas J. Aveda Institute	http://douglasj.edu	MI
Eastern Michigan University	http://emich.edu	MI
Ferris State University	http://ferris.edu	MI
Finlandia University	http://finlandia.edu	MI
Grand Rapids Community College	http://grcc.edu	MI
Grand Valley State University	http://gvsu.edu	MI
Henry Ford College	http://hfcc.edu	MI
Hillsdale College	http://hillsdale.edu	MI
Hope College	http://hope.edu	MI
Jackson College	http://jccmi.edu	MI
Kettering University	http://kettering.edu	MI
Kalamazoo Valley Community College	http://kvcc.edu	MI
Kalamazoo College	http://kzoo.edu	MI
Lake Michigan College	http://lakemichigancollege.edu	MI
Lansing Community College	http://lcc.edu	MI
Lake Superior State University	http://lssu.edu	MI
Lawrence Technological University	http://ltu.edu	MI
Macomb Community College	http://macomb.edu	MI
Marygrove College	http://marygrove.edu	MI
Monroe County Community College	http://monroeccc.edu	MI
Michigan State University	http://msu.edu	MI
Michigan Technological University	http://mtu.edu	MI
Northwestern Michigan College	http://nmc.edu	MI
Northern Michigan University	http://nmu.edu	MI
Oakland Univeristy	http://oakland.edu	MI
Oakland Community College	http://oaklandcc.edu	MI
Saginaw Chippewa Tribal College	http://sagchip.edu	MI
Saginaw Valley State University	http://svsu.edu	MI
University of Detroit Mercy	http://udmercy.edu	MI
University of Michigan-Flint	http://umflint.edu	MI
University of Michigan	http://umich.edu	MI
Wayne State	http://wayne.edu	MI
Washtenaw Community College	http://wccnet.edu	MI
Western Michigan University	http://wmich.edu	MI
Alexandria Technical & Community College	http://alextech.edu	MN
Anoka-Ramsey Community College	http://anokaramsey.edu	MN
Augsburg College	http://augsburg.edu	MN
Bemidji State University	http://bemidjistate.edu	MN
Bethel University	http://bethel.edu	MN
Carleton College	http://carleton.edu	MN
Century College	http://century.edu	MN
Central Lakes College	http://clcmn.edu	MN
Concordia College	http://cord.edu	MN
Crown College	http://crown.edu	MN
College of Saint Benedict, Saint John’s University	http://csbsju.edu	MN
Concordia University Saint Paul	http://csp.edu	MN
The College of Saint Scholastica	http://css.edu	MN
Dakota County Technical College	http://dctc.edu	MN
Gustavus Adolphus College	http://gustavus.edu	MN
Globe University	http://globeuniversity.edu	MN
Hamline University	http://hamline.edu	MN
Inver Hills Community College	http://inverhills.edu	MN
Institute of Production and Recording	http://ipr.edu	MN
Leech Lake Tribal College	http://lltc.edu	MN
Luther Seminary	http://luthersem.edu	MN
Macalester College	http://macalester.edu	MN
McNally Smith College of Music	http://mcnallysmith.edu	MN
Mesabi Range College	http://mesabirange.edu	MN
Metropolitan State University	http://metrostate.edu	MN
Minnesota State University Moorhead	http://mnstate.edu	MN
Minnesota State University Mankato	http://mnsu.edu	MN
North Hennepin Community College	http://nhcc.edu	MN
Normandale Community College	http://normandale.edu	MN
Rasmussen College	http://rasmussen.edu	MN
Ridgewater College	http://ridgewater.edu	MN
Southwest Minnesota State University	http://smsu.edu	MN
Saint Mary’s University of Minnesota	http://smumn.edu	MN
South Central College	http://southcentral.edu	MN
Saint Cloud State  University	http://stcloudstate.edu	MN
Saint Olaf College	http://stolaf.edu	MN
University of Saint Thomas	http://stthomas.edu	MN
University of Minnesota	http://umn.edu	MN
United Theological Seminary of the Twin Cities	http://unitedseminary.edu	MN
University of Northwestern Saint Paul	http://unwsp.edu	MN
Walden University	http://waldenu.edu	MN
Winona State Unviversity	http://winona.edu	MN
Assemblies of God Theological Seminary	http://agts.edu	MO
Aquinas Institute of Theology	http://ai.edu	MO
A.T. Still University	http://atsu.edu	MO
Avila University	http://avila.edu	MO
Columbia College	http://ccis.edu	MO
Central Methodist University	http://centralmethodist.edu	MO
Crowder College	http://crowder.edu	MO
Culver-Stockton College	http://culver.edu	MO
Drury University	http://drury.edu	MO
Evangel University	http://evangel.edu	MO
Fontbonne University	http://fontbonne.edu	MO
Hannibal-LaGrange	http://hlg.edu	MO
Harris-Stowe State University	http://hssu.edu	MO
Jefferson College	http://jeffco.edu	MO
Kansas City University of Medicine and Biosciences	http://kcumb.edu	MO
Lincoln University	http://lincolne.edu	MO
Lindenwood University	http://lindenwood.edu	MO
Linn State Technical College	http://linnstate.edu	MO
Maryville University	http://maryville.edu	MO
Metropolitan Community College	http://mcckc.edu	MO
Mineral Area College	http://mineralarea.edu	MO
Mizzou University of Missouri	http://missouri.edu	MO
Missouri State University	http://missouristate.edu	MO
Missouri Valley College	http://moval.edu	MO
Missouri Southern State  University	http://mssu.edu	MO
Missouri University of Science and Technology	http://mst.edu	MO
North Central Missouri College	http://ncmissouri.edu	MO
Nazarene Theological Seminary	http://nts.edu	MO
Northwest Missouri State University	http://nwmissouri.edu	MO
Ozarks Technical Community College	http://otc.edu	MO
Park University	http://park.edu	MO
Rockhurst University	http://rockhurst.edu	MO
Southwest Baptist University	http://sbuniv.edu	MO
South Central Career Center	http://scccwp.edu	MO
Southeast Missouri State University	http://semo.edu	MO
Saint Louis University	http://slu.edu	MO
Saint Charles Community College	http://stchas.edu	MO
Saint Louis Community College	http://stlcc.edu	MO
Truman State University	http://truman.edu	MO
University of Central Missouri	http://ucmo.edu	MO
University of Missouri Kansas City	http://umkc.edu	MO
University of Missouri Saint Louis	http://umsl.edu	MO
University of Missouri System	http://umsystem.edu	MO
Webster University	http://webster.edu	MO
Westminster College, Missouri	http://westminster-mo.edu	MO
Washington University in Saint Louis	http://wustl.edu	MO
Alcorn State University	http://alcorn.edu	MS
Belhaven University	http://belhaven.edu	MS
Delta State University	http://deltastate.edu	MS
East Mississippi Community College	http://eastms.edu	MS
Jackson State University	http://jsums.edu	MS
Mississippi Gulf Coast Community College	http://mgccc.edu	MS
Mississippi State University	http://mssstate.edu	MS
Northeast Mississippi Community College	http://nemcc.edu	MS
The University of Mississippi	http://olemiss.edu	MS
Pearl River Community College	http://prcc.edu	MS
Reformed Theological Seminary	http://rts.edu	MS
University of Mississippi Medical Center	http://umc.edu	MS
University of Southern Mississippi	http://usm.edu	MS
William Carey University	http://wmcarey.edu	MS
Itawamba Community College	http://iccms.edu	MS
Blackfeet Community College	http://bfcc.edu	MT
Carroll College	http://carroll.edu	MT
Fort Peck Community College	http://fpcc.edu	MT
Flathead Valley Community College	http://fvcc.edu	MT
Miles Community College	http://milescc.edu	MT
Montana State University	http://montana.edu	MT
Montana State University Billings	http://msubillings.edu	MT
Montana State University – Northern	http://msun.edu	MT
Montana Tech of the University of Montana	http://mtech.edu	MT
Montana University System	http://mus.edu	MT
Rocky Mountain College	http://rocky.edu	MT
University of Montana Helena College	http://umhelena.edu	MT
University of Montana	http://umt.edu	MT
University of Montana Western	http://umwestern.edu	MT
Asheville-Buncombe Technical Community College	http://abtech.edu	NC
Alamance Community College	http://alamancecc.edu	NC
Appalachian State University	http://appstate.edu	NC
Bladen Community College	http://bladencc.edu	NC
Body Therapy Institute	http://bti.edu	NC
Campbell University	http://campbell.edu	NC
Cape Fear Community College	http://cfcc.edu	NC
Charlotte School of Law	http://charlottelaw.edu	NC
Chowan University	http://chowan.edu	NC
Central Piedmont Community College	http://cpcc.edu	NC
Craven Community College	http://cravencc.edu	NC
Davidson College	http://davidson.edu	NC
Duke University	http://duke.edu	NC
Durham Technical Community College	http://durhamtech.edu	NC
Elizabeth City State University	http://ecsu.edu	NC
East Carolina University	http://ecu.edu	NC
Elon University	http://elon.edu	NC
Fayetteville Technical Community College	http://faytechcc.edu	NC
Forsyth Technical Community College	http://forsythtech.edu	NC
Gardner-Webb University	http://gardner-webb.edu	NC
Gaston College	http://gaston.edu	NC
Guilford Technical Community College	http://gtcc.edu	NC
Heritage Bible College	http://heritagebiblecollege.edu	NC
High Point University	http://highpoint.edu	NC
Isothermal Community College	http://isothermal.edu	NC
Lenoir Community College	http://lenoircc.edu	NC
Lees McRae College	http://lmc.edu	NC
Methodist University	http://methodist.edu	NC
The University of Mount Olive	http://umo.edu	NC
Montgomery Community College	http://montgomery.edu	NC
North Carolina Central University	http://nccu.edu	NC
North Carolina School of Science and Mathematics	http://ncssm.edu	NC
North Carolina State University	http://ncsu.edu	NC
North Carolina Wesleyan College	http://ncwc.edu	NC
New Life Theological Seminary	http://nlts.edu	NC
University of North Carolina	http://northcarolina.edu	NC
Piedmont Community College	http://piedmontcc.edu	NC
Pitt Community College	http://pittcc.edu	NC
Queens University of Charlotte	http://queens.edu	NC
Randolph Community College	http://randolph.edu	NC
Roanoke-Chowan Community College	http://roanokechowan.edu	NC
Salem College	http://salem.edu	NC
Sampson Community College	http://sampsoncc.edu	NC
Sandhills Community College	http://sandhills.edu	NC
Saint Andrews University	http://sapc.edu	NC
Southeastern Community College	http://sccnc.edu	NC
Southeastern Baptist Theological Seminary	http://sebts.edu	NC
Shaw University	http://shawu.edu	NC
Southwestern Community College	http://southwesterncc.edu	NC
South Piedmont Community College	http://spcc.edu	NC
Stanly Community College	http://stanly.edu	NC
Saint Augustine’s University	http://st-aug.edu	NC
University of North Carolina at Chapel Hill	http://unc.edu	NC
University of North Carolina Asheville	http://unca.edu	NC
University of North Carolina Charlotte	http://uncc.edu	NC
University of North Carolina Greensboro	http://uncg.edu	NC
University of North Carolina Pembroke	http://uncp.edu	NC
University of North Carolina School of the Arts	http://uncsa.edu	NC
University of North Carolina Wilmington	http://uncw.edu	NC
Vance-Granville Community College	http://vgcc.edu	NC
Wake Technical Community College	http://waketech.edu	NC
Warren Wilson College	http://warren-wilson.edu	NC
Western Carolina University	http://wcu.edu	NC
Wake Forest University	http://wfu.edu	NC
Western Piedmont Community College	http://wpcc.edu	NC
Winston-Salem State University	http://wssu.edu	NC
Dakota College at Bottineau	http://dakotacollege.edu	ND
Mayville State University	http://mayvillestate.edu	ND
Minot State University	http://minotstateu.edu	ND
North Dakota State University	http://ndsu.edu	ND
North Dakota University System	http://ndus.edu	ND
Turtle Mountain Community College	http://tm.edu	ND
University of North Dakota	http://und.edu	ND
United Tribes Technical College	http://utcc.edu	ND
Valley City State University	http://vcsu.edu	ND
Williston State College	http://willistonstate.edu	ND
Bellevue University	http://bellevue.edu	NE
Bryan College of Health Sciences	http://bryanhealth.com	NE
Creighton University	http://creighton.edu	NE
Chadron State College	http://csc.edu	NE
Concordia University Nebraska	http://cune.edu	NE
Joseph’s College	http://josephscollege.edu	NE
Little Priest Tribal College	http://littlepriest.edu	NE
Mid-Plains Community College	http://mpcc.edu	NE
University of Nebraska	http://nebraska.edu	NE
Northeast Community College	http://northeast.edu	NE
Union College	http://ucollege.edu	NE
University of Nebraska at Kearney	http://unk.edu	NE
University of Nebraska at Lincoln	http://unl.edu	NE
University of Nebraska Medical Center	http://unmc.edu	NE
University of Nebraska Omaha	http://unomaha.edu	NE
Wayne State College	http://wsc.edu	NE
Saint Anselm College	http://anselm.edu	NH
Antioch University New England	http://antiochne.edu	NH
Community College System of New Hampshire	http://ccsnh.edu	NH
Colby Sawyer College	http://colby-sawyer.edu	NH
Dartmouth College	http://dartmouth.edu	NH
Phillips Exeter Academy	http://exeter.edu	NH
Granite State College	http://granite.edu	NH
Keene State College	http://keene.edu	NH
Manchester Community College	http://mccnh.edu	NH
Mount Washington College	http://mountwashington.edu	NH
Nashua Community College	http://nashuacc.edu	NH
New England College	http://nec.edu	NH
NHTI Concord’s Community College	http://nhti.edu	NH
Plymouth State University	http://plymouth.edu	NH
Rivier University	http://rivier.edu	NH
Southern New Hampshire University	http://snhu.edu	NH
University of New Hampshire	http://unh.edu	NH
White Mountains Community College	http://wmcc.edu	NH
Atlantic Cape Community College	http://atlantic.edu	NJ
Burlington County College	http://bcc.edu	NJ
Bergen Community College	http://bergen.edu	NJ
Brookdale Community College	http://brookdalecc.edu	NJ
Centenary College of New Jersey	http://centenarycollege.edu	NJ
Drew University	http://drew.edu	NJ
Eastwick College	http://eastwickcollege.edu	NJ
Fairleigh Dickinson University	http://fdu.edu	NJ
Felician College	http://felician.edu	NJ
Fortis Institute	http://fortis.edu	NJ
Georgian Court University	http://georgian.edu	NJ
Kean University	http://kean.edu	NJ
Mercer County Community  College	http://mccc.edu	NJ
Middlesex County College	http://middlesexcc.edu	NJ
Monmouth University	http://monmouth.edu	NJ
Montclair State University	http://montclair.edu	NJ
New Jersey City University	http://njcu.edu	NJ
New Jersey Institute of Technology	http://njit.edu	NJ
Ocean County College	http://ocean.edu	NJ
Princeton University	http://princeton.edu	NJ
Princeton Theological Seminary	http://ptsem.edu	NJ
Ramapo College of New Jersey	http://ramapo.edu	NJ
Raritan Valley Community College	http://raritanval.edu	NJ
Rider University	http://rider.edu	NJ
Rowan University	http://rowan.edu	NJ
Rutgers University	http://rutgers.edu	NJ
Seton Hall University	http://shu.edu	NJ
Stenotech Career Institute	http://stenotech.edu	NJ
Stevens Institute of Technology	http://stevens.edu	NJ
Stockton College	http://stockton.edu	NJ
Sussex County Community College	http://sussex.edu	NJ
The College of New Jersey	http://tcnj.edu	NJ
Thomas Edison State College	http://tesc.edu	NJ
William Paterson University	http://wpunj.edu	NJ
County College of Morris	http://ccm.edu	NJ
Camden County College	http://camdencc.edu	NJ
Passaic County Community College	http://pccc.edu	NJ
Ross University	http://rossu.edu	NJ
Central New Mexico	http://cnm.edu	NM
Eastern New Mexico University	http://enmu.edu	NM
New Mexico Highlands University	http://nmhu.edu	NM
New Mexico State University	http://nmsu.edu	NM
New Mexico State University Alamogordo	http://nmsua.edu	NM
New Mexico Institute of Mining and Technology	http://nmt.edu	NM
Northern New Mexico College	http://nnmc.edu	NM
San Juan College	http://sanjuancollege.edu	NM
Southwestern College	http://swc.edu	NM
Univeristy of New Mexico	http://unm.edu	NM
University of the Southwest	http://usw.edu	NM
College of Southern Nevada	http://csn.edu	NV
Great Basin College	http://gbcnv.edu	NV
Pima Medical Institute	http://pmi.edu	NV
Sierra Nevada College	http://sierranevada.edu	NV
Truckee Meadows Community College	http://tmcc.edu	NV
University of Nevada Las Vegas	http://unlv.edu	NV
University of Nevada Reno	http://unr.edu	NV
Western Nevada College	http://wnc.edu	NV
Adelphi University	http://adelphi.edu	NY
University at Albany	http://albany.edu	NY
Alfred University	http://alfred.edu	NY
The American Musical and Dramatic Academy	http://amda.edu	NY
ASA College	http://asa.edu	NY
Bard College	http://bard.edu	NY
Barnard College	http://barnard.edu	NY
Binghamton University	http://binghamton.edu	NY
The College at Brockport	http://brockport.edu	NY
University at Buffalo	http://buffalo.edu	NY
Buffalo State University	http://buffalostate.edu	NY
Cazenovia College	http://cazenovia.edu	NY
Clarkson University	http://clarkson.edu	NY
Clinton Community College	http://clinton.edu	NY
The College of New Rochelle	http://cnr.edu	NY
Cobleskill University	http://cobleskill.edu	NY
Colgate University	http://colgate.edu	NY
Columbia University in the City of New York	http://columbia.edu	NY
Concordia College New York	http://concordia-ny.edu	NY
The Cooper Union	http://cooper.edu	NY
Cornell University	http://cornell.edu	NY
Cortland College	http://cortland.edu	NY
The City University of New York	http://cuny.edu	NY
The College of Westchester	http://cw.edu	NY
Daemen College	http://daemen.edu	NY
Dominican College	http://dc.edu	NY
Delhi State University of New York	http://delhi.edu	NY
Dowling College	http://dowling.edu	NY
D’Youville College	http://dyc.edu	NY
Erie Community College State University of New York	http://ecc.edu	NY
Elim Bible Institute	http://elim.edu	NY
Elmira College	http://elmira.edu	NY
Empire State College	http://esc.edu	NY
College of Environmental Science and Forestry	http://esf.edu	NY
Farmingdale State College	http://farmingdale.edu	NY
Fashion Institute of Technology	http://fitnyc.edu	NY
Finger Lakes Community College	http://flcc.edu	NY
Fordham University	http://fordham.edu	NY
Fredonia University	http://fredonia.edu	NY
Five Towns College	http://ftc.edu	NY
Geneseo University	http://geneseo.edu	NY
Globe Institute of Technology	http://globe.edu	NY
The General Theological Seminary	http://gts.edu	NY
Hamilton College	http://hamilton.edu	NY
Hartwick College	http://hartwick.edu	NY
Herkimer College	http://herkimer.edu	NY
Hofstra University	http://hofstra.edu	NY
Hudson Valley Community College	http://hvcc.edu	NY
Hobart and William Smith Colleges	http://hws.edu	NY
Institute of Design and Construction	http://idc.edu	NY
Iona College	http://iona.edu	NY
Ithaca College	http://ithaca.edu	NY
The Jewish Theological Seminary	http://jtsa.edu	NY
The Juilliard School	http://juilliard.edu	NY
Keuka College	http://keuka.edu	NY
Lehman College	http://lehman.edu	NY
Le Moyne	http://lemoyne.edu	NY
Lim College	http://limcollege.edu	NY
Long Island University	http://liu.edu	NY
Manhattan College	http://manhattan.edu	NY
Marist College	http://marist.edu	NY
Metropolitan College of New York	http://mcny.edu	NY
Mercy College	http://mercy.edu	NY
Marymount Manhattan College	http://mmm.edu	NY
Monroe Community College	http://monroecc.edu	NY
Morrisville State College	http://morrisville.edu	NY
Mount Saint Marry College	http://msmc.edu	NY
Icahn School of Medicine at Mount Sinai	http://mssm.edu	NY
Manhattanville College	http://mville.edu	NY
Nazareth College	http://naz.edu	NY
Nassau Community College	http://ncc.edu	NY
New Paltz	http://newpaltz.edu	NY
The New School	http://newschool.edu	NY
Niagara University	http://niagara.edu	NY
Nyack College	http://nyack.edu	NY
New York College of Health Professions	http://nycollege.edu	NY
New York Film Academy	http://nyfa.edu	NY
New York Institute of Technology	http://nyit.edu	NY
New York University	http://nyu.edu	NY
State University of New York at Oneonta	http://oneonta.edu	NY
State University of New York at Oswego	http://oswego.edu	NY
Pace University	http://pace.edu	NY
Paul Smith’s College	http://paulsmiths.edu	NY
State University of New York at Plattsburgh	http://plattsburgh.edu	NY
State University of New York at Potsdam	http://potsdam.edu	NY
Pratt Institute	http://pratt.edu	NY
Purchase College	http://purchase.edu	NY
Rochester Institute of Technology	http://rit.edu	NY
Roberts Wesleyan College	http://roberts.edu	NY
University of Rochester	http://rochester.edu	NY
Rensselaer Polytechnic Institute	http://rpi.edu	NY
The Sages Colleges	http://sage.edu	NY
Saint Bonaventure University	http://sbu.edu	NY
The New York Conservatory for Dramatic Arts	http://sft.edu	NY
Siena College	http://siena.edu	NY
Saint John Fisher College	http://sjfc.edu	NY
Skidmore College	http://skidmore.edu	NY
Sarah Lawrence College	http://slc.edu	NY
Saint Bernard’s School of Theology and Ministry	http://stbernards.edu	NY
Saint John’s University	http://stjohns.edu	NY
Saint Lawrence University	http://stlawu.edu	NY
Stony Brook University	http://stonybrook.edu	NY
Stony Brook Medicine	http://stonybrookmedicine.edu	NY
The College of Saint Rose	http://strose.edu	NY
State University of New York	http://suny.edu	NY
State University of New York at Adirondack	http://sunyacc.edu	NY
State University of New Institute of Technology	http://sunyit.edu	NY
Jamestown Community College	http://sunyjcc.edu	NY
Orange County Community College	http://sunyorange.edu	NY
Rockland Community College	http://sunyrockland.edu	NY
Suffolk County Community College	http://sunysuffolk.edu	NY
Westchester Community College	http://sunywcc.edu	NY
Syracuse University	http://syr.edu	NY
Tompkins Cortland Community College	http://tc3.edu	NY
The Touro College and University System	http://touro.edu	NY
Touro College Jacob D. Fuchsberg Law Center	http://tourolaw.edu	NY
Union College	http://union.edu	NY
Upstate  Medical University	http://upstate.edu	NY
United States Military Academy West Point	http://usma.edu	NY
Utica College	http://utica.edu	NY
Vassar College	http://vassar.edu	NY
Wagner College	http://wagner.edu	NY
Wells College	http://wells.edu	NY
Yeshiva University	http://yu.edu	NY
Canton State University of New York	http://canton.edu	NY
Excelsior College	http://excelsior.edu	NY
Culinary Institute of America	http://ciachef.edu	NY
Ashland University	http://ashland.edu	OH
Aultman College of Nursing and Health Sciences	http://aultmancollege.edu	OH
Belmont College	http://belmontcollege.edu	OH
Bowling Green State University	http://bgsu.edu	OH
Baldwin Wallace University	http://bw.edu	OH
Capital University	http://capital.edu	OH
Case Western Reserve University	http://case.edu	OH
Cincinnati College of Mortuary Science	http://ccms.edu	OH
Cedarville University	http://cedarville.edu	OH
Central State University	http://centralstate.edu	OH
Cincinnati State Technical and Community College	http://cincinnatistate.edu	OH
Central Ohio Technical College	http://cotc.edu	OH
Columbus State Community College	http://cscc.edu	OH
Cleveland State University	http://csuohio.edu	OH
Western Reserve University	http://cwru.edu	OH
Defiance College	http://defiance.edu	OH
Denison University	http://denison.edu	OH
The University of Findlay	http://findlay.edu	OH
Franklin University	http://franklin.edu	OH
Heidelberg University	http://heidelberg.edu	OH
Hiram College	http://hiram.edu	OH
Hocking College	http://hocking.edu	OH
John Carroll University	http://jcu.edu	OH
Kettering College	http://kc.edu	OH
Kent State University	http://kent.edu	OH
Kenyon College	http://kenyon.edu	OH
Lakeland Community College	http://lakelandcc.edu	OH
Lima Central Catholic High School	http://lcchs.edu	OH
Lorain County Community College	http://lorainccc.edu	OH
Malone University	http://malone.edu	OH
Marietta College	http://marietta.edu	OH
Miami University	http://miamioh.edu	OH
University of Mount Union	http://mountunion.edu	OH
Mount Saint Joseph University	http://msj.edu	OH
Muskingum University	http://muskingum.edu	OH
Mount Vernon Nazarene University	http://mvnu.edu	OH
North Central State College	http://ncstatecollege.edu	OH
Oberlin College and Conservatory	http://oberlin.edu	OH
Ohio University	http://ohio.edu	OH
Ohio Dominican University	http://ohiodominican.edu	OH
Ohio State University	http://osu.edu	OH
Ohio Northern University	http://onu.edu	OH
Otterbein University	http://otterbein.edu	OH
Owens Community College	http://owens.edu	OH
Ohio Wesleyan University	http://owu.edu	OH
University of Rio  Grande	http://rio.edu	OH
Shawnee State University	http://shawnee.edu	OH
Sinclair Community College	http://sinclair.edu	OH
Tiffin University	http://tiffin.edu	OH
Cuyahoga Community College	http://tri-c.edu	OH
The University of Akron	http://uakron.edu	OH
University of Cincinnati	http://uc.edu	OH
University of Cincinnati Blue Ash	http://ucblueash.edu	OH
University of Cincinnati Clermont	http://ucclermont.edu	OH
University of Dayton	http://udayton.edu	OH
Urbana University	http://urbana.edu	OH
Ursuline College	http://ursuline.edu	OH
University of Toledo	http://utoledo.edu	OH
Walsh University	http://walsh.edu	OH
Wilmington College	http://wilmington.edu	OH
Wittenberg University	http://wittenberg.edu	OH
The College of Wooster	http://wooster.edu	OH
Wright State University	http://wright.edu	OH
Xavier University	http://xavier.edu	OH
Youngstown State University	http://ysu.edu	OH
Ohio State University	http://osu.edu	OH
Cameron University	http://cameron.edu	OK
Connors State College	http://connorsstate.edu	OK
East  Central University	http://ecok.edu	OK
Langston University	http://langston.edu	OK
Mid-America Christian University	http://macu.edu	OK
Meridian Technology Center	http://meridiantech.edu	OK
Northeastern State University	http://nsuok.edu	OK
Northwestern Oklahoma State University	http://nwosu.edu	OK
Oklahoma Christian University	http://oc.edu	OK
Oklahoma City Community College	http://occc.edu	OK
Oklahoma City University	http://okcu.edu	OK
Oklahoma State University	http://okstate.edu	OK
Oral Roberts University	http://oru.edu	OK
Oklahoma State University Institue of Technology	http://osuit.edu	OK
Oklahoma State University	http://osuokc.edu	OK
The University of Oklahoma	http://ou.edu	OK
The University of Oklahoma Health Sciences Center	http://ouhsc.edu	OK
Rose State College	http://rose.edu	OK
Rogers State University	http://rsu.edu	OK
Southeastern Oklahoma State University	http://se.edu	OK
Southwestern Christian University	http://swcu.edu	OK
Southwestern Oklahoma State Univeristy	http://swosu.edu	OK
Tulsa Community College	http://tulsacc.edu	OK
University of Central Oklahoma	http://uco.edu	OK
University of Science and Arts of Oklahoma	http://usao.edu	OK
University of Tulsa	http://utulsa.edu	OK
Western Oklahoma State College	http://wosc.edu	OK
Blue Mountain Community College	http://bluecc.edu	OR
Clatsop Community College	http://clatsopcc.edu	OR
Central Oregon Community College	http://cocc.edu	OR
Columbia School of English	http://cs.edu	OR
Concordia University Portland Oregon	http://cu-portland.edu	OR
Eastern Oregon University	http://eou.edu	OR
George Fox University	http://georgefox.edu	OR
Lane Community College	http://lanecc.edu	OR
Lewis and Clark	http://lclark.edu	OR
Linfield College	http://linfield.edu	OR
Linn-Benton Community College	http://linnbenton.edu	OR
Marylhurst University	http://marylhurst.edu	OR
National College of Natural Medicine	http://ncnm.edu	OR
Oregon Health and Science University	http://ohsu.edu	OR
Oregon State University	http://oregonstate.edu	OR
Pacific University Oregon	http://pacificu.edu	OR
Portland Community College	http://pcc.edu	OR
Portland State University	http://pdx.edu	OR
Reed College	http://reed.edu	OR
Rogue Community College	http://roguecc.edu	OR
Southwestern Oregon Community  College	http://socc.edu	OR
Southern Oregon University	http://sou.edu	OR
University of Oregon	http://uoregon.edu	OR
University of Portland	http://up.edu	OR
Warner Pacific College	http://warnerpacific.edu	OR
Willamette University	http://willamette.edu	OR
Western Oregon University	http://wou.edu	OR
Allegheny College	http://allegheny.edu	PA
Alvernia University	http://alvernia.edu	PA
Arcadia University	http://arcadia.edu	PA
Baptist Bible College & Seminary	http://bbc.edu	PA
Butler County Community College	http://bc3.edu	PA
Bloomsburg University	http://bloomu.edu	PA
Bryn Mawr College	http://brynmawr.edu	PA
Bucknell University	http://bucknell.edu	PA
Bucks County Community College	http://bucks.edu	PA
California University of Pennsylvania	http://calu.edu	PA
Carlow University	http://carlow.edu	PA
Community College of Allegheny County	http://ccac.edu	PA
Community College of Philadelphia	http://ccp.edu	PA
Cedar Crest College	http://cedarcrest.edu	PA
Chatham University	http://chatham.edu	PA
Chestnut Hill College	http://chc.edu	PA
Clarion University	http://clarion.edu	PA
Carnegie Mellon University	http://cmu.edu	PA
Delaware County Community College	http://dccc.edu	PA
Delaware Valley College	http://delval.edu	PA
Dickinson College	http://dickinson.edu	PA
Drexel University	http://drexel.edu	PA
Drexel University College of Medicine	http://drexelmed.edu	PA
Duquesne University	http://duq.edu	PA
Eastern University	http://eastern.edu	PA
Edinboro University	http://edinboro.edu	PA
Elizabethtown College	http://etown.edu	PA
Evangelical Seminary	http://evangelical.edu	PA
Franklin & Marshall College	http://fandm.edu	PA
Saint Francis University	http://francis.edu	PA
Grove City College	http://gcc.edu	PA
Geneva College	http://geneva.edu	PA
Gettysburg College	http://gettysburg.edu	PA
Harrisburg Area Community College	http://hacc.edu	PA
Haverford College	http://haverford.edu	PA
Holy Family University	http://holyfamily.edu	PA
Indiana University of Pennsylvania	http://iup.edu	PA
Thomas Jefferson University	http://jefferson.edu	PA
Juniata College	http://juniata.edu	PA
Keystone College	http://keystone.edu	PA
King’s College	http://kings.edu	PA
Kutztown University	http://kutztown.edu	PA
Lackawanna College	http://lackawanna.edu	PA
Lafayette College	http://lafayette.edu	PA
Lancaster County Career and Technology Center	http://lancasterctc.edu	PA
Lancaster Theological Seminary	http://lancasterseminary.edu	PA
La Roche College	http://laroche.edu	PA
La Salle University	http://lasalle.edu	PA
Lehigh Carbon Community College	http://lccc.edu	PA
Lake Erie College of Osteopathic Medicine	http://lecom.edu	PA
Lehigh University	http://lehigh.edu	PA
Lock Haven University	http://lhup.edu	PA
The Lincoln University	http://lincoln.edu	PA
Lansdale School of Business	http://lsb.edu	PA
Lebanon Valley College	http://lvc.edu	PA
Lycoming College	http://lycoming.edu	PA
Manor College	http://manor.edu	PA
Mansfield University	http://mansfield.edu	PA
Marywood University	http://marywood.edu	PA
Montgomery County Community College	http://mc3.edu	PA
Mercyhurst University	http://mercyhurst.edu	PA
Messiah College	http://messiah.edu	PA
Millersville University	http://millersville.edu	PA
Misericordia University	http://misericordia.edu	PA
Moravian College	http://moravian.edu	PA
Mount Aloysius College	http://mtaloy.edu	PA
Muhlenberg College	http://muhlenberg.edu	PA
Neumann University	http://neumann.edu	PA
Northampton Community College	http://northampton.edu	PA
Pennsylvania Gunsmith School	http://pagunsmith.edu	PA
Philadelphia College of Osteopathic Medicine	http://pcom.edu	PA
Pennsylvania College of Technology	http://pct.edu	PA
Philadelphia University	http://philau.edu	PA
University of Pittsburgh	http://pitt.edu	PA
Penn State University	http://psu.edu	PA
Reading Area Community College	http://racc.edu	PA
Robert Morris University	http://rmu.edu	PA
Saint Vincent Seminary	http://saintvincentseminary.edu	PA
Salus University	http://salus.edu	PA
The University of Scranton	http://scranton.edu	PA
Shippensburg University	http://ship.edu	PA
Saint Joseph’s University	http://sju.edu	PA
Slippery Rock University	http://sru.edu	PA
Saint Vincent College	http://stvincent.edu	PA
Susquehanna University	http://susqu.edu	PA
Swarthmore College	http://swarthmor.edu	PA
Temple University	http://temple.edu	PA
The  American College of Financial Services	http://theamericancollege.edu	PA
Thiel College	http://thiel.edu	PA
University of the Arts	http://uarts.edu	PA
University of Pennsylvania	http://upenn.edu	PA
University of the Sciences in Philadelphia	http://usciences.edu	PA
Valley Forge Christian College	http://vfcc.edu	PA
Villanova University	http://villanova.edu	PA
Washington and Jefferson  College	http://washjeff.edu	PA
Westmoreland County Community College	http://wccc.edu	PA
West  Chester University	http://wcupa.edu	PA
Westminster College	http://westminster.edu	PA
Widener University	http://widener.edu	PA
Wilkes University	http://wilkes.edu	PA
Wilson College	http://wilson.edu	PA
York College of Pennsylvania	http://ycp.edu	PA
Pennsylvania Academy of the Fine Arts	http://pafa.edu	PA
East Stroudsburg University	http://esu.edu	PA
Ursinus College	http://ursinus.edu	PA
DeSales University	http://desales.edu	PA
Lancaster Bible College	http://lbc.edu	PA
Cheyney University of Pennsylvania	http://cheyney.edu	PA
Brown University	http://brown.edu	RI
Bryant University	http://bryant.edu	RI
Community College of Rhode Island	http://ccri.edu	RI
Johnson and Wales University	http://jwu.edu	RI
New England Institute of Technology	http://neit.edu	RI
Providence College	http://providence.edu	RI
The University of Rhode Island	http://uri.edu	RI
Rhode Island College	http://ric.edu	RI
Rhose Island School of Design	http://risd.edu	RI
Roger Williams University	http://rwu.edu	RI
University of Rhode Island	http://uri.edu	RI
Centura College	http://centura.edu	SC
The Citadel Military College of South Carolina	http://citadel.edu	SC
Columbia International University	http://ciu.edu	SC
Clemson University	http://clemson.edu	SC
Coastal Carolina University	http://coastal.edu	SC
College of Charleston	http://cofc.edu	SC
Coker College	http://coker.edu	SC
Columbia College South Carolina	http://columbiasc.edu	SC
Florence-Darlington Technical College	http://fdtc.edu	SC
Francis Marion University	http://fmarion.edu	SC
Forrest College	http://forrestcollege.edu	SC
Furman University	http://furman.edu	SC
Lander University	http://lander.edu	SC
Limestone College	http://limestone.edu	SC
Midlands Technical College	http://midlandstech.edu	SC
Medical University of South Carolina	http://musc.edu	SC
Newberry College	http://newberry.edu	SC
North Greenville University	http://ngu.edu	SC
Orangeburg-Calhoun Technical College	http://octech.edu	SC
Presbyterian College	http://presby.edu	SC
University of South Carolina	http://sc.edu	SC
South Carolina State University	http://scsu.edu	SC
Sinte Gleska University	http://sintegleska.edu	SC
Spartanburg Methodist College	http://smcsc.edu	SC
TriCounty Technical College	http://tctc.edu	SC
University of South Carolina Aiken	http://usca.edu	SC
University of South Carolina Beaufort	http://uscb.edu	SC
University of South Carolina Upstate	http://uscupstate.edu	SC
Winthrop University	http://winthrop.edu	SC
Wofford College	http://wofford.edu	SC
York Technical College	http://yorktech.edu	SC
Bob Jones University	http://bju.edu	SC
Anderson University	http://andersonuniversity.edu	SC
Black Hills State University	http://bhsu.edu	SD
Dakota State University	http://dsu.edu	SD
Dakota Wesleyan University	http://dwu.edu	SD
Mount Marty College	http://mtmc.edu	SD
Northern State University	http://northern.edu	SD
South Dakota School of Mines and Technology	http://sdsmt.edu	SD
South Dakota State University	http://sdstate.edu	SD
University of South Dakota	http://usd.edu	SD
University of Sioux Falls	http://usioxfalls.edu	SD
Western Dakota Technical Institute	http://wdt.edu	SD
Austin Peay State University	http://apsu.edu	TN
Belmont University	http://belmont.edu	TN
Bryan College	http://bryan.edu	TN
Christian Brothers University	http://cbu.edu	TN
Carson-Newman University	http://cn.edu	TN
Columbia State Community College	http://columbiastate.edu	TN
Cumberland University	http://cumberland.edu	TN
DeVry University	http://devry.edu	TN
East Tennessee State University	http://etsu.edu	TN
Freed-Hardeman University	http://fhu.edu	TN
Fisk University	http://fisk.edu	TN
Huntington College of Health Sciences	http://hchs.edu	TN
Hiwassee College	http://hiwassee.edu	TN
Johnson University	http://johnsonu.edu	TN
Jackson State Community College	http://jscc.edu	TN
Lee University	http://leeuniversity.edu	TN
Lincoln Memorial University	http://lmunet.edu	TN
The LeMoyne-Owen College	http://loc.edu	TN
The University of Memphis	http://memphis.edu	TN
Milligan College	http://milligan.edu	TN
Middle Tennessee State University	http://mtsu.edu	TN
Nashville State Community College	http://nscc.edu	TN
Pellissippi State Community College	http://pstcc.edu	TN
Rhodes College	http://rhodes.edu	TN
Roane State Community College	http://roanestate.edu	TN
Southern College of Optometry	http://sco.edu	TN
Sewanee The University of the South	http://sewanee.edu	TN
Southern Adventist University	http://southern.edu	TN
The University of Tennessee	http://tennessee.edu	TN
Southwest Tennessee Community College	http://tn.edu	TN
Tennessee State University	http://tnstate.edu	TN
Tennessee Technological University	http://tntech.edu	TN
Tennessee Wesleyan College	http://twcnet.edu	TN
University of Tennessee Chattanooga	http://utc.edu	TN
University of Tennessee Health Science Center	http://uthsc.edu	TN
University of Tennessee Knoxville	http://utk.edu	TN
University of Tennessee Martin	http://utm.edu	TN
University of Tennessee Space Institute	http://utsi.edu	TN
Union University	http://uu.edu	TN
Vanderbilt University	http://vanderbilt.edu	TN
Volunteer State Community College	http://volstate.edu	TN
King University	http://king.edu	TN
Abilene Christian University	http://acu.edu	TX
Alamo Colleges	http://alamo.edu	TX
Alvin Community College	http://alvincollege.edu	TX
Angelo State University	http://angelo.edu	TX
Austin Community College District	http://austincc.edu	TX
Austin College	http://austincollege.edu	TX
Austin Graduate School of Theology	http://austingrad.edu	TX
Baylor University	http://baylor.edu	TX
Blinn College	http://blinn.edu	TX
Brazosport College	http://brazosport.edu	TX
Brookhaven College	http://brookhavencollege.edu	TX
Baptist Health System School of Health Professions	http://bshp.edu	TX
Career Point College	http://careerpointcollege.edu	TX
Cedar Valley College	http://cedarvalleycollege.edu	TX
Coastal Bend College	http://coastalbend.edu	TX
College of the Mainland	http://com.edu	TX
Concordia University Texas	http://concordia.edu	TX
Central Texas College	http://ctcd.edu	TX
Culinary Institute LeNotre	http://culinaryinstitute.edu	TX
Dallas Baptist University	http://dbu.edu	TX
Del Mar College	http://delmar.edu	TX
Dallas Nursing Institute	http://dni.edu	TX
El Paso Community College	http://epcc.edu	TX
East Texas Baptist University	http://etbu.edu	TX
Galen College of Nursing	http://galencollege.edu	TX
Galveston College	http://gc.edu	TX
Grayson College	http://grayson.edu	TX
Houston Baptist University	http://hbu.edu	TX
Houston Community College	http://hccs.edu	TX
Hill College	http://hillcollege.edu	TX
Howard College	http://howardcollege.edu	TX
Howard Payne University	http://hputx.edu	TX
Lamar University	http://lamar.edu	TX
Lamar State College – Port Arthur	http://lamarpa.edu	TX
Lubbock Christian University	http://lcu.edu	TX
LeTourneau University	http://letu.edu	TX
Lamar Institute of Technology	http://lit.edu	TX
Lone Star College System	http://lonestar.edu	TX
Lamar State College – Orange	http://lsco.edu	TX
McLennan Community College	http://mclennan.edu	TX
McMurry University	http://mcm.edu	TX
Midland College	http://midland.edu	TX
Midwestern  State University	http://mwsu.edu	TX
National American University	http://national.edu	TX
North Central Texas College	http://nctc.edu	TX
North American University	http://northamerican.edu	TX
North Lake College	http://northlakecollege.edu	TX
Odessa College	http://odessa.edu	TX
Ogle School	http://ogleschool.edu	TX
Our Lady of the Lake University	http://ollusa.edu	TX
Panola College	http://panola.edu	TX
Patty Hands Shelton School of Nursing	http://phssn.edu	TX
Prairie View A&M University	http://pvamu.edu	TX
Rice University	http://rice.edu	TX
Richland College	http://richlandcollege.edu	TX
San Jacinto College	http://sanjac.edu	TX
Schreiner University	http://schreiner.edu	TX
Stephen F. Austin State University	http://sfasu.edu	TX
Sam Houston State University	http://shsu.edu	TX
Southern Methodist University	http://smu.edu	TX
South Plains College	http://southplainscollege.edu	TX
South Texas College	http://southtexascollege.htp	TX
Southwestern University	http://southwestern.edu	TX
Seminary of the Southwest	http://ssw.edu	TX
South Texas College of Law	http://stcl.edu	TX
Saint Edward’s University	http://stedwards.edu	TX
Saint Mary’s University	http://stmarytx.edu	TX
University of Saint Thomas	http://stthom.edu	TX
Texas A&M Health Science Center	http://tamhsc.edu	TX
Texas A&M International University	http://tamiu.edu	TX
Texas A&M University	http://tamu.edu	TX
Texas A&M University Commerce	http://tamuc.edu	TX
Texas A&M University Corpus Christi	http://tamucc.edu	TX
Texas A&M University Kingsville	http://tamuk.edu	TX
Texas A&M University Texarkana	http://tamut.edu	TX
Tarleton State University	http://tarleton.edu	TX
Texas Christian University	http://tcu.edu	TX
Temple College	http://templejc.edu	TX
Tyler Junior College	http://tjc.edu	TX
Trinity University	http://trinity.edu	TX
Texas State Technical College	http://tstc.edu	TX
Texas Southern University	http://tsu.edu	TX
Texas Tech University	http://ttu.edu	TX
Texas Tech University Health Sciences Center	http://ttuhsc.edu	TX
Texas Woman’s University	http://twu.edu	TX
Texas Chiropractic College	http://txchiro.edu	TX
Texas State University	http://txstate.edu	TX
University of Dallas	http://udallas.edu	TX
Universty of Houston	http://uh.edu	TX
University of Houston Clear Lake	http://uhcl.edu	TX
University of Houston Downtown	http://uhd.edu	TX
University of the Incarnate Word	http://uiw.edu	TX
University of Mary Hardin-Baylor	http://umhb.edu	TX
University of North Texas	http://unt.edu	TX
University of North Texas Health Science Center	http://unthsc.edu	TX
University of Texas Arlington	http://uta.edu	TX
University of Texas Brownsville	http://utb.edu	TX
University of Texas Dallas	http://utdallas.edu	TX
University of Texas at El Paso	http://utep.edu	TX
University of Texas at Austin	http://utexas.edu	TX
University of Texas Health Science Center Houston	http://uth.edu	TX
University of Texas Health Science Center San Antonio	http://uthscsa.edu	TX
University of Texas Medical Branch at Galveston	http://utmb.edu	TX
University of Texas Pan American	http://utpa.edu	TX
University of Texas of the Permian Basin	http://utpb.edu	TX
University of Texas at San Antonio	http://utsa.edu	TX
University of Texas Southwestern Medical Center	http://utsouthwestern.edu	TX
University of Texas at Tyler	http://online.uttyler.edu/	TX
Valley Grande Institute	http://vgi.edu	TX
Victoria College	http://victoriacollege.edu	TX
Wayland Baptist University	http://wbu.edu	TX
Weatherford College	http://wc.edu	TX
West Texas A&M University	http://wtamu.edu	TX
University of the Virgin Islands	http://uvi.edu	USVI
Brigham Young University	http://byu.edu	UT
Dixie State University	http://dixie.edu	UT
Salt Lake Community College	http://slcc.edu	UT
Snow College	http://snow.edu	UT
Southern Utah University	http://suu.edu	UT
Utah State University	http://usu.edu	UT
University of Utah	http://utah.edu	UT
Utah Valley University	http://uvu.edu	UT
Weber State University	http://weber.edu	UT
Averett University	http://averett.edu	VA
Christendom College	http://christendom.edu	VA
Christopher Newport University	http://cnu.edu	VA
Dabney S. Lancaster Community College	http://dslcc.edu	VA
Eastern Mennonite University	http://emu.edu	VA
Eastern Virginia Medical School	http://evms.edu	VA
Ferrum College	http://ferrum.edu	VA
Germanna Community College	http://germanna.edu	VA
George Mason University	http://gmu.edu	VA
Hampden-Sydney College	http://hsc.edu	VA
The Institute for the Psychological Sciences	http://ipsciences.edu	VA
James Madison University	http://jmu.edu	VA
Liberty University	http://liberty.edu	VA
Longwood University	http://longwood.edu	VA
Marymount University	http://marymount.edu	VA
New River Community College	http://nr.edu	VA
Norfolk State University	http://nsu.edu	VA
Northern Virginia Community College	http://nvcc.edu	VA
Old Dominion University	http://odu.edu	VA
Radford University	http://radford.edu	VA
Randolph College	http://randolphcollege.edu	VA
Rappahannock Community College	http://rappahannock.edu	VA
Regent University	http://regent.edu	VA
Reynolds Community College	http://reynolds.edu	VA
University of Richmond	http://richmond.edu	VA
Randolph-Macon College	http://rmc.edu	VA
Roanoke College	http://roanoke.edu	VA
Sentara College of Health Sciences	http://sentara.edu	VA
Stratford University	http://stratford.edu	VA
Shenandoah University	http://su.edu	VA
Southern Virgina University	http://svu.edu	VA
Southwest Virgina Community College	http://sw.edu	VA
Tidewater Community College	http://tcc.edu	VA
Thomas Nelson Community College	http://tncc.edu	VA
University of Mary Washington	http://umw.edu	VA
University of Virginia’s College at Wise	http://uvawise.edu	VA
Virginia’s Community Colleges	http://vccs.edu	VA
Virginia Commonwealth University	http://vcu.edu	VA
Virgina Highlands Community College	http://vhcc.edu	VA
Virginia Institute of Marine Science	http://vims.edu	VA
University of Virginia	http://virginia.edu	VA
Virginia Western Community College	http://virginiawestern.edu	VA
Virginia International University	http://viu.edu	VA
Virginia State University	http://vsu.edu	VA
Virginia Polytechnic Institute and State University	http://vt.edu	VA
Virginia Union University	http://vuu.edu	VA
Virginia Wesleyan College	http://vwc.edu	VA
Washington and Lee University	http://wlu.edu	VA
The College of William and Mary	http://wm.edu	VA
Castleton State College of Vermont	http://castleton.edu	VT
Champlain College	http://champlain.edu	VT
Green Mountain College	http://greenmtn.edu	VT
Johnson State College	http://jsc.edu	VT
Middlebury College	http://middlebury.edu	VT
New England Culinary Institute	http://neci.edu	VT
Norwich  University	http://norwich.edu	VT
School for International Training	http://sit.edu	VT
Saint Michael’s College	http://smcvt.edu	VT
University of Vermont	http://uvm.edu	VT
University of Vermont	http://uvm.edu	VT
Vermont Law School	http://vermontlaw.edu	VT
Vermont Technical College	http://vtc.edu	VT
Bennington College	http://bennington.edu	VT
Bellevue College	http://bellevuecollege.edu	WA
Big Bend Community College	http://bigbend.edu	WA
Cascadia Community College	http://cascadia.edu	WA
Centralia College	http://centralia.edu	WA
Charter College	http://chartercollege.edu	WA
Clark College	http://clark.edu	WA
Central Washington University	http://cwu.edu	WA
DigiPen Institute of Technology	http://digipen.edu	WA
Edmonds Community College	http://edcc.edu	WA
Everett Community College	http://everettcc.edu	WA
The Evergreen State College	http://evergreen.edu	WA
Eastern Washington University	http://ewu.edu	WA
Faith Evangelical College and Seminary	http://faithseminary.edu	WA
Gonzaga University	http://gonzaga.edu	WA
Green River Community College	http://greenriver.edu	WA
Highline College	http://highline.edu	WA
Mukogawa Fort Wright Institute	http://mfwi.edu	WA
North Seattle College	http://northseattle.edu	WA
Olympic College	http://olympic.edu	WA
Peninsula College	http://pencol.edu	WA
Perry Technical Institute	http://perrytech.edu	WA
Pacific Lutheran University	http://plu.edu	WA
Renton Technical College	http://rtc.edu	WA
Seattle Central College	http://seattlecentral.edu	WA
Seattle University	http://seattleu.edu	WA
Shoreline Community College	http://shoreline.edu	WA
Seattle Institute of Oriental Medicine	http://siom.edu	WA
Skagit Valley College	http://skagit.edu	WA
South Seattle College	http://southseattle.edu	WA
Spokane Falls Community College	http://spokanefalls.edu	WA
Seattle Pacific University	http://spu.edu	WA
Saint Martin’s University	http://stmartin.edu	WA
University of Puget Sound	http://pugetsound.edu	WA
University of Washington	http://uw.edu	WA
University of Washington Bothell	http://uwb.edu	WA
Walla Walla University	http://wallawalla.edu	WA
Whitman College	http://whitman.edu	WA
Whitworth University	http://whitworth.edu	WA
Washington State University	http://wsu.edu	WA
Wenatchee Valley College	http://wvc.edu	WA
Walla Walla Community College	http://wwcc.edu	WA
Western Washington University	http://wwu.edu	WA
Yakima Valley Community College	http://yvcc.edu	WA
University of Washington	http://washington.edu	WA
Alverno College	http://alverno.edu	WI
Carroll University	http://carrollu.edu	WI
Carthage College	http://carthage.edu	WI
Chippewa Valley Technical College	http://cvtc.edu	WI
Edgewood College	http://edgewood.edu	WI
Gateway Technical College	http://gtc.edu	WI
The Institute of Beauty and Wellness	http://ibw.edu	WI
Lawrence University	http://lawrence.edu	WI
Madison Area Technical College	http://madisoncollege.edu	WI
Marquette University	http://marquette.edu	WI
Milwaukee Area Technical College	http://matc.edu	WI
Medical College of Wisconsin	http://mcw.edu	WI
Milwaukee Institute of Art and Design	http://miad.edu	WI
Moraine Park Technical College	http://morainepark.edu	WI
Milwaukee School of Engineering	http://msoe.edu	WI
Northland College	http://northland.edu	WI
Northcentral  Technical College	http://ntc.edu	WI
Northeast Wisconsin Technical College	http://nwtc.edu	WI
Silver Lake College of the Holy Family	http://sl.edu	WI
Saint Norbert College	http://snc.edu	WI
Cardinal Stritch University	http://stritch.edu	WI
University of Wisconsin Colleges	http://uwc.edu	WI
University of Wisconsin Eau Claire	http://uwec.edu	WI
University of Wisconsin Extension	http://uwex.edu	WI
University of Wisconsin Green Bay	http://uwgb.edu	WI
University of Wisconsin La Crosse	http://uwlax.edu	WI
University of Wisconsin Milwaukee	http://uwm.edu	WI
University of Wisconsin Oshkosh	http://uwosh.edu	WI
University of Wisconsin Platteville	http://uwplatt.edu	WI
University of Wisconsin River Falls	http://uwrf.edu	WI
University of Wisconsin Stevens Point	http://uwsp.edu	WI
University of Wisconsin Superior	http://uwsuper.edu	WI
University of Wisconsin Whitewater	http://uww.edu	WI
Viterbo University	http://viterbo.edu	WI
Waukesha County Technical College	http://wctc.edu	WI
University of Wisconsin, Madison	http://wisc.edu	WI
Wisconsin Indianhead Technical College	http://witc.edu	WI
Wisconsin Lutheran College	http://wlc.edu	WI
Wisconsin Technical College System	http://wtcsystem.edu	WI
Western Technical College	http://westerntc.edu	WI
American Public University System	http://apus.edu	WV
Concord University	http://concord.edu	WV
Eastern West Virgina Community and Technical College	http://easternwv.edu	WV
Fairmont State University	http://fairmontstate.edu	WV
Marshall University	http://marshall.edu	WV
Ohio Valley University	http://ovu.edu	WV
Pierpont Community and Technical College	http://pierpont.edu	WV
Shepherd University	http://shepherd.edu	WV
University of Charleston	http://ucwv.edu	WV
West Liberty University	http://westliberty.edu	WV
Wheeling Jesuit University	http://wju.edu	WV
West Virginia Northern Community College	http://wvncc.edu	WV
West Virginia State University	http://wvstateu.edu	WV
West Virginia University	http://wvu.edu	WV
West Virginia Wesleyan College	http://wvwc.edu	WV
Casper College	http://caspercollege.edu	WY
Central Wyoming College	http://cwc.edu	WY
National Outdoor Leadership School	http://nols.edu	WY
Northwest College	http://northwestcollege.edu	WY
Northern Wyoming Community College District	http://sheridan.edu	WY
University of Wyoming	http://uwyo.edu	WY`

export const SCHOOLS = RAW_SCHOOLS.split('\n').map(s => s.split('\t')).map([name, site, state] => name);
