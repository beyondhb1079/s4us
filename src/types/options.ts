// Source: https://www.ssa.gov/international/coc-docs/states.html
const RAW_STATES = `Alabama	AL
Alaska	AK
American Samoa	AS
Arizona	AZ
Arkansas	AR
California	CA
Colorado	CO
Connecticut	CT
Delaware	DE
District Of Columbia	DC
Florida	FL
Georgia	GA
Guam	GU
Hawaii	HI
Idaho	ID
Illinois	IL
Indiana	IN
Iowa	IA
Kansas	KS
Kentucky	KY
Louisiana	LA
Maine	ME
Maryland	MD
Massachusetts	MA
Michigan	MI
Minnesota	MN
Mississippi	MS
Missouri	MO
Montana	MT
Nebraska	NE
Nevada	NV
New Hampshire	NH
New Jersey	NJ
New Mexico	NM
New York	NY
North Carolina	NC
North Dakota	ND
Northern Mariana Islands	MP
Ohio	OH
Oklahoma	OK
Oregon	OR
Pennsylvania	PA
Puerto Rico	PR
Rhode Island	RI
South Carolina	SC
South Dakota	SD
Tennessee	TN
Texas	TX
Utah	UT
Vermont	VT
Virginia	VA
Virgin Islands	VI
Washington	WA
West Virginia	WV
Wisconsin	WI
Wyoming	WY`;

interface State {
  /** Full name of the state or territory, e.g. `'Alabama'`. */
  name: string;
  /** State abbreviation, e.g. `'AL'`. */
  abbr: string;
}

export const STATES: State[] = RAW_STATES.split('\n')
  .map((s) => s.split('\t'))
  .map(([name, abbr]) => ({ name, abbr }));

// Source: https://matchcollege.com/top-majors
//
// From the console:
// copy([...document.querySelectorAll('td > a')].map(s => s.innerText).join('\n'))
const RAW_MAJORS = `Accounting
Administrative Assistant
Advertising and Marketing
Agriculture
Aircraft Mechanic
Animal Science
Animation
Anthropology
Architecture
Art History
Athletic Training
Audio and Video Production
Audiology and Speech Pathology
Auto Body
Auto Mechanic
Aviation
Baking And Pastry
Behavioral Science
Biochemistry
Biology
Biomedical Engineering
Biomedical Science
Biotechnology
Bookkeeping
Bus and Truck Driver
Business Administration
Carpentry
Chemical Engineering
Chemistry
Child Care
Child Development
Christian Counseling
Cinematography And Film
Civil Engineering
Clinical Psychology
Commercial and Advertising Art
Communications
Computer Aided Design (CAD)
Computer Networking
Computer Programming
Computer Science
Construction Management
Corrections Officer
Cosmetology
Counseling Psychology
Creative Writing
Criminal Justice
Criminology
Culinary Arts
Curriculum and Instruction
Dental Assistant
Dental Hygienist
Dentistry
Design and Visual Communications
Diesel Mechanic
Dietetics
Drama and Theatre Arts
EMT & Paramedic
ESL
Early Childhood Education
Economics
Education
Educational Leadership and Administration
Electrical Engineering
Electrician
Elementary Education
Engineering
Engineering Management
English
Entrepreneurship
Environmental Science
Esthetician
Exercise Physiology
Family Practice Nurse
Family Studies
Fashion Design
Fashion Merchandising
Finance
Financial Planning
Fine Arts and Studio Arts
Fire Prevention
Fire Science
Forensic Psychology
Forensic Science
General Studies
Geography
Geology
Graphic Design
Guidance Counselor
Health Information and Medical Records Technology
Healthcare Administration
Heating and Air Conditioning (HVAC)
Higher Education Administration
History
Hospital and Healthcare Facility Management
Human Resources
Human Services
Industrial Engineering
Industrial Mechanics
Industrial Technology
Information Science
Information Systems
Information Technology
Interior Design
International Business
International Relations
International and Global Studies
Journalism
Kinesiology And Exercise Science
Law
Law and Justice Administration
Liberal Arts
Licensed Practical Nurse (LPN)
Logistics and Supply Chain Management
Machinist
Management Science
Manufacturing Engineering Technician
Marriage and Family Therapy
Massage Therapy
Materials Engineering
Math
Mechanical Engineering
Medical Assistant
Medical Executive Assistant
Medical Insurance Biller
Medical Insurance Coding
Medical Lab Technician
Medical Office Assistant
Medical Office Management
Medical Technology
Medicine
Mental Health Counseling
Middle School Teacher
Ministry
Molecular Biology
Multimedia
Music
Nail Technician
Neuroscience
Nursing
Nursing Administration
Nursing Assistant
Nursing Science
Nutrition
Occupational Therapy
Occupational Therapy Assistant (OTA)
Office Management and Supervision
Operations Management
Optometry
Organizational Behavior Studies
Organizational Leadership
Organizational and Nonprofit Management
Osteopathy
Paralegal
Parks and Recreation Management
Pharmacy
Pharmacy Technician
Philosophy
Phlebotomy
Physical Education
Physical Therapist Assistant
Physical Therapy
Physician Assistant
Physics
Political Science
Project Management
Psychology
Public Administration
Public Health
Public Policy
Public Relations
Radiology Technician
Reading Teacher and Literacy Specialist
Real Estate
Religious Studies
Respiratory Therapy
Risk Management and Insurance
Sales Manager
School Psychology
Secondary Education
Social Science
Social Work
Sociology
Software Engineering
Spanish Language and Literature
Special Education
Sports Management
Sports Medicine
Statistics
Substance Abuse and Addiction Counseling
Surgical Technologist
Systems Engineering
Talmudic Studies
Theology
Ultrasound Technician
Veterinary Assistant
Veterinary Medicine
Web Design
Welding`;

export const MAJORS = new Set(RAW_MAJORS.split('\n'));

// Source (copying and pasting):
// https://www.theedadvocate.org/an-a-z-list-of-u-s-colleges-and-universities/
const RAW_SCHOOLS = `A.T. Still University	http://atsu.edu	MO
AIB College of Business	http://aib.edu	IA
ASA College	http://asa.edu	NY
ATI College	http://ati.edu	CA
Abilene Christian University	http://acu.edu	TX
Academy of Arts University	http://academyart.edu	CA
Acupuncture & Integrative Medicine College	http://aimc.edu	CA
Acupuncture Massage College	http://amcollege.edu	FL
Adams State University	http://adams.edu	CO
Adance Computing Institute	http://advancedcomputinginstitute.edu	CA
Adelphi University	http://adelphi.edu	NY
Adrian College	http://adrian.edu	MI
Agnes Scott College	http://agnesscott.edu	GA
Aims Community College	http://aims.edu	CO
Alabama A&M University	http://aamu.edu	AL
Alamance Community College	http://alamancecc.edu	NC
Alamo Colleges	http://alamo.edu	TX
Alaska Christian College	http://alaskacc.edu	AK
Albany Technical College	http://albanytech.edu	GA
Albertus Magnus College	http://albertus.edu	CT
Albion College	http://albion.edu	MI
Alcorn State University	http://alcorn.edu	MS
Alexandria Technical & Community College	http://alextech.edu	MN
Alfred University	http://alfred.edu	NY
Allan Hancock College	http://hancockcollege.edu	CA
Allegheny College	http://allegheny.edu	PA
Alliant International University	http://alliant.edu	CA
Allied American University	http://allied.edu	CA
Alma College	http://alma.edu	MI
Alpena Community College	http://alpenacc.edu	MI
Alvernia University	http://alvernia.edu	PA
Alverno College	http://alverno.edu	WI
Alvin Community College	http://alvincollege.edu	TX
American Public University System	http://apus.edu	WV
American University	http://american.edu	DC
Amherst College	http://amherst.edu	MA
Anabaptist Mennonite Biblical Seminary	http://ambs.edu	IN
Anaheim University	http://anaheim.edu	CA
Anderson University	http://anderson.edu	IN
Anderson University	http://andersonuniversity.edu	SC
Andrews University	http://andrews.edu	MI
Angeles College	http://angelescollege.edu	CA
Angelo State University	http://angelo.edu	TX
Anne Arundel Community College	http://aacc.edu	MD
Anoka-Ramsey Community College	http://anokaramsey.edu	MN
Antelope Valley College	http://avc.edu	CA
Antioch University Los Angeles	http://antiochla.edu	CA
Antioch University New England	http://antiochne.edu	NH
Appalachian State University	http://appstate.edu	NC
Aquinas College	http://aquinas.edu	MI
Aquinas Institute of Theology	http://ai.edu	MO
Arapahoe Community College	http://arapahoe.edu	CO
Arcadia University	http://arcadia.edu	PA
Argosy University	http://argosy.edu	CA
Arizona State University	http://asu.edu	AZ
Arizona Western College	http://azwestern.edu	AZ
Arkansas Northeastern College	http://anc.edu	AR
Arkansas State University	http://astate.edu	AR
Arkansas Tech University	http://atu.edu	AR
Armstrong Atlantic State University	http://armstrong.edu	GA
Art Center College of Design	http://artcenter.edu	CA
Asbury University	http://asbury.edu	KY
Asheville-Buncombe Technical Community College	http://abtech.edu	NC
Ashford University	http://ashford.edu	CA
Ashland University	http://ashland.edu	OH
Asnuntuck Community College	http://asnuntuck.edu	CT
Assemblies of God Theological Seminary	http://agts.edu	MO
Assumption College	http://assumption.edu	MA
Athens State University	http://athens.edu	AL
Atlanta Metropolitan State College	http://atlm.edu	GA
Atlanta Technical College	http://atlantatech.edu	GA
Atlanta’s John Marshall Law School	http://johnmarshall.edu	GA
Atlantic Cape Community College	http://atlantic.edu	NJ
Atlantic Institute of Oriental Medicine	http://atom.edu	FL
Auburn University	http://auburn.edu	AL
Auburn University at Montgomery	http://aum.edu	AL
Augsburg College	http://augsburg.edu	MN
Augusta University	http://augusta.edu	GA
Augustana College	http://augustana.edu	IL
Aultman College of Nursing and Health Sciences	http://aultmancollege.edu	OH
Auraria Higher Education Center	http://ahec.edu	CO
Aurora University	http://aurora.edu	IL
Austin College	http://austincollege.edu	TX
Austin Community College District	http://austincc.edu	TX
Austin Graduate School of Theology	http://austingrad.edu	TX
Austin Peay State University	http://apsu.edu	TN
Averett University	http://averett.edu	VA
Avila University	http://avila.edu	MO
Babson College	http://babson.edu	MA
Baker College	http://baker.edu	MI
Bakersfield College	http://bakersfieldcollege.edu	CA
Baldwin Wallace University	http://bw.edu	OH
Ball State University	http://bsu.edu	IN
Baltimore City Community College	http://bccc.edu	MD
Baptist Bible College & Seminary	http://bbc.edu	PA
Baptist Health System School of Health Professions	http://bshp.edu	TX
Bard College	http://bard.edu	NY
Barnard College	http://barnard.edu	NY
Barry University	http://barry.edu	FL
Barstow Community College	http://barstow.edu	CA
Bates College	http://bates.edu	ME
Bay College	http://baycollege.edu	MI
Baylor University	http://baylor.edu	TX
Belhaven University	http://belhaven.edu	MS
Bellarmine University	http://bellarmine.edu	KY
Bellevue College	http://bellevuecollege.edu	WA
Bellevue University	http://bellevue.edu	NE
Belmont College	http://belmontcollege.edu	OH
Belmont University	http://belmont.edu	TN
Bemidji State University	http://bemidjistate.edu	MN
Benedictine College	http://benedictine.edu	KS
Benedictine University	http://ben.edu	IL
Bennington College	http://bennington.edu	VT
Bentley University	http://bentley.edu	MA
Berea College	http://berea.edu	KY
Bergen Community College	http://bergen.edu	NJ
Berkeley City College	http://berkeleycitycollege.edu	CA
Berkeley University of California	http://berkeley.edu	CA
Berklee College of Music	http://berklee.edu	MA
Berkshire Community College	http://berkshirecc.edu	MA
Berry College	http://berry.edu	GA
Bethel College Indiana	http://bethelcollege.edu	IN
Bethel University	http://bethel.edu	MN
Bethune-Cookman University	http://cookman.edu	FL
Big Bend Community College	http://bigbend.edu	WA
Binghamton University	http://binghamton.edu	NY
Birmingham-Southern College	http://bsc.edu	AL
Black Hills State University	http://bhsu.edu	SD
Blackfeet Community College	http://bfcc.edu	MT
Bladen Community College	http://bladencc.edu	NC
Blinn College	http://blinn.edu	TX
Bloomsburg University	http://bloomu.edu	PA
Blue Mountain Community College	http://bluecc.edu	OR
Bob Jones University	http://bju.edu	SC
Body Therapy Institute	http://bti.edu	NC
Boise State University	http://boisestate.edu	ID
Bossier Parish Community College	http://bpcc.edu	LA
Boston Architectural College	http://the-bac.edu	MA
Boston College	http://bc.edu	MA
Boston University	http://bu.edu	MA
Bowdoin College	http://bowdoin.edu	ME
Bowie State University	http://bowiestate.edu	MD
Bowling Green State University	http://bgsu.edu	OH
Bradley University	http://bradley.edu	IL
Brandeis University	http://brandeis.edu	MA
Brandman University	http://brandman.edu	CA
Brazosport College	http://brazosport.edu	TX
Bridgewater State University	http://bridgew.edu	MA
Brigham Young University	http://byu.edu	UT
Brigham Young University Hawaii	http://byuh.edu	HI
Brigham Young University Idaho	http://byui.edu	ID
Brookdale Community College	http://brookdalecc.edu	NJ
Brookhaven College	http://brookhavencollege.edu	TX
Broward College	http://broward.edu	FL
Brown Mackie College	http://brownmackie.edu	IN
Brown University	http://brown.edu	RI
Bryan College	http://bryan.edu	TN
Bryan College of Health Sciences	http://bryanhealth.com	NE
Bryan University	http://bryanuniversity.edu	AZ
Bryant University	http://bryant.edu	RI
Bryn Mawr College	http://brynmawr.edu	PA
Bucknell University	http://bucknell.edu	PA
Bucks County Community College	http://bucks.edu	PA
Buffalo State University	http://buffalostate.edu	NY
Burlington County College	http://bcc.edu	NJ
Butler Community College	http://butlercc.edu	KS
Butler County Community College	http://bc3.edu	PA
Butler University	http://butler.edu	IN
Butte College	http://butte.edu	CA
Cabrillo College	http://cabrillo.edu	CA
Calhoun Community College	http://calhoun.edu	AL
California Baptist University	http://calbaptist.edu	CA
California College of the Arts	http://cca.edu	CA
California Community Colleges Chanellor’s Office	http://cccco.edu	CA
California Institute of Integral Studies	http://ciis.edu	CA
California Institute of Technology	http://caltech.edu	CA
California Institute of the Arts	http://calarts.edu	CA
California Lutheran University	http://callutheran.edu	CA
California Miramar University	http://calmu.edu	CA
California Polytechnic State University	http://calpoly.edu	CA
California State Polytechnic University Pomona	http://csupomona.edu	CA
California State University	http://calstate.edu	CA
California State University Bakersfield	http://csub.edu	CA
California State University Channel Islands	http://csuci.edu	CA
California State University Dominguez Hills	http://csudh.edu	CA
California State University East Bay	http://csueastbay.edu	CA
California State University Fullerton	http://fullerton.edu	CA
California State University Long Beach	http://csulb.edu	CA
California State University Monterey Bay	http://csumb.edu	CA
California State University Northridge	http://csun.edu	CA
California State University Sacramento	http://csus.edu	CA
California State University San Bernardino	http://csusb.edu	CA
California State University San Marcos	http://csusm.edu	CA
California State University Stanislaus	http://csustan.edu	CA
California University of Pennsylvania	http://calu.edu	PA
California Western School of Law San Diego	http://cwsl.edu	CA
Calvin College	http://calvin.edu	MI
Cambridge College	http://cambridgecollege.edu	MA
Camden County College	http://camdencc.edu	NJ
Cameron University	http://cameron.edu	OK
Campbell University	http://campbell.edu	NC
Canada College	http://canadacollege.edu	CA
Canton State University of New York	http://canton.edu	NY
Cape Fear Community College	http://cfcc.edu	NC
Capital University	http://capital.edu	OH
Cardinal Stritch University	http://stritch.edu	WI
Career Point College	http://careerpointcollege.edu	TX
Carleton College	http://carleton.edu	MN
Carlos Albizu University	http://albizu.edu	FL
Carlow University	http://carlow.edu	PA
Carnegie Institution for Science	http://carnegiescience.edu	DC
Carnegie Mellon University	http://cmu.edu	PA
Carroll College	http://carroll.edu	MT
Carroll Community College	http://carrollcc.edu	MD
Carroll University	http://carrollu.edu	WI
Carson-Newman University	http://cn.edu	TN
Carthage College	http://carthage.edu	WI
Carver College	http://carver.edu	GA
Cascadia Community College	http://cascadia.edu	WA
Case Western Reserve University	http://case.edu	OH
Casper College	http://caspercollege.edu	WY
Castleton State College of Vermont	http://castleton.edu	VT
Cazenovia College	http://cazenovia.edu	NY
Cedar Crest College	http://cedarcrest.edu	PA
Cedar Valley College	http://cedarvalleycollege.edu	TX
Cedarville University	http://cedarville.edu	OH
Centenary College of Louisiana	http://centenary.edu	LA
Centenary College of New Jersey	http://centenarycollege.edu	NJ
Central Arizona College	http://centralaz.edu	AZ
Central Baptist College	http://cbc.edu	AR
Central College	http://central.edu	IA
Central Georgia Technical College	http://centralgatech.edu	GA
Central Lakes College	http://clcmn.edu	MN
Central Maine Community College	http://cmcc.edu	ME
Central Methodist University	http://centralmethodist.edu	MO
Central Michigan University	http://cmich.edu	MI
Central New Mexico	http://cnm.edu	NM
Central Ohio Technical College	http://cotc.edu	OH
Central Oregon Community College	http://cocc.edu	OR
Central Piedmont Community College	http://cpcc.edu	NC
Central State University	http://centralstate.edu	OH
Central Texas College	http://ctcd.edu	TX
Central Washington University	http://cwu.edu	WA
Central Wyoming College	http://cwc.edu	WY
Centralia College	http://centralia.edu	WA
Centre College	http://centre.edu	KY
Centura College	http://centura.edu	SC
Century College	http://century.edu	MN
Cerritos College	http://cerritos.edu	CA
Cerro Coso Community College	http://cerrocoso.edu	CA
Chadron State College	http://csc.edu	NE
Chaffey College	http://chaffey.edu	CA
Chaminade University	http://chaminade.edu	HI
Champlain College	http://champlain.edu	VT
Chapman University	http://chapman.edu	CA
Charlotte School of Law	http://charlottelaw.edu	NC
Charter College	http://chartercollege.edu	WA
Chatham University	http://chatham.edu	PA
Chesapeake College	http://chesapeake.edu	MD
Chestnut Hill College	http://chc.edu	PA
Cheyney University of Pennsylvania	http://cheyney.edu	PA
Chicago ORT Technical Institute	http://ortchicagotech.edu	IL
Child Care Education Institute	http://cceionline.edu	GA
Chipola College	http://chipola.edu	FL
Chippewa Valley Technical College	http://cvtc.edu	WI
Chowan University	http://chowan.edu	NC
Christendom College	http://christendom.edu	VA
Christian Brothers University	http://cbu.edu	TN
Christopher Newport University	http://cnu.edu	VA
Cincinnati College of Mortuary Science	http://ccms.edu	OH
Cincinnati State Technical and Community College	http://cincinnatistate.edu	OH
Citrus College	http://citruscollege.edu	CA
City College of San Francisco	http://ccsf.edu	CA
City Colleges of Chicago	http://ccc.edu	IL
Claremont Graduate University	http://cgu.edu	CA
Claremont McKenna College	http://cmc.edu	CA
Clarion University	http://clarion.edu	PA
Clark College	http://clark.edu	WA
Clark University	http://clarku.edu	MA
Clarkson University	http://clarkson.edu	NY
Clatsop Community College	http://clatsopcc.edu	OR
Clayton State University	http://clayton.edu	GA
Clemson University	http://clemson.edu	SC
Cleveland State University	http://csuohio.edu	OH
Clinton Community College	http://clinton.edu	NY
Coastal Bend College	http://coastalbend.edu	TX
Coastal Carolina University	http://coastal.edu	SC
Cobleskill University	http://cobleskill.edu	NY
Coe College	http://coe.edu	IA
Cogswell Polytechnical College	http://cogswell.edu	CA
Coker College	http://coker.edu	SC
Colby College	http://colby.edu	ME
Colby Sawyer College	http://colby-sawyer.edu	NH
Colgate University	http://colgate.edu	NY
College for Creative Studies	http://collegeforcreativestudies.edu	MI
College of Central Florida	http://cf.edu	FL
College of Charleston	http://cofc.edu	SC
College of DuPage	http://cod.edu	IL
College of Environmental Science and Forestry	http://esf.edu	NY
College of Lake County	http://clcillinois.edu	IL
College of Marin	http://marin.edu	CA
College of Saint Benedict, Saint John’s University	http://csbsju.edu	MN
College of San Mateo	http://collegeofsanmateo.edu	CA
College of Southern Idaho	http://csi.edu	ID
College of Southern Maryland	http://csmd.edu	MD
College of Southern Nevada	http://csn.edu	NV
College of the Atlantic	http://coa.edu	ME
College of the Canyons	http://canyons.edu	CA
College of the Desert	http://collegeofthedesert.edu	CA
College of the Holy Cross	http://holycross.edu	MA
College of the Mainland	http://com.edu	TX
College of the Redwoods	http://redwoods.edu	CA
College of the Sequoias	http://cos.edu	CA
College of the Siskiyous	http://siskiyous.edu	CA
Colorado College	http://coloradocollege.edu	CO
Colorado Heights University	http://chu.edu	CO
Colorado Mesa University	http://coloradomesa.edu	CO
Colorado School of Mines	http://mines.edu	CO
Colorado State University	http://colostate.edu	CO
Colorado State University-Pueblo	http://colostate-pueblo.edu	CO
Columbia College	http://ccis.edu	MO
Columbia College	http://gocolumbia.edu	CA
Columbia College Chicago	http://colum.edu	IL
Columbia College South Carolina	http://columbiasc.edu	SC
Columbia International University	http://ciu.edu	SC
Columbia School of English	http://cs.edu	OR
Columbia State Community College	http://columbiastate.edu	TN
Columbia University in the City of New York	http://columbia.edu	NY
Columbus State Community College	http://cscc.edu	OH
Columbus State University	http://columbusstate.edu	GA
Columbus Technical College	http://columbustech.edu	GA
Community College System of New Hampshire	http://ccsnh.edu	NH
Community College of Allegheny County	http://ccac.edu	PA
Community College of Aurora	http://ccaurora.edu	CO
Community College of Denver	http://ccd.edu	CO
Community College of Philadelphia	http://ccp.edu	PA
Community College of Rhode Island	http://ccri.edu	RI
Concord University	http://concord.edu	WV
Concordia College	http://cord.edu	MN
Concordia College New York	http://concordia-ny.edu	NY
Concordia University Nebraska	http://cune.edu	NE
Concordia University Portland Oregon	http://cu-portland.edu	OR
Concordia University Saint Paul	http://csp.edu	MN
Concordia University Texas	http://concordia.edu	TX
Connecticut College	http://conncoll.edu	CT
Connors State College	http://connorsstate.edu	OK
Contra Costa College	http://contracosta.edu	CA
Copper Mountain College	http://cmccd.edu	CA
Coppin State University	http://coppin.edu	MD
Cornell College	http://cornellcollege.edu	IA
Cornell University	http://cornell.edu	NY
Cornerstone University	http://cornerstone.edu	MI
Cortland College	http://cortland.edu	NY
County College of Morris	http://ccm.edu	NJ
Covenant College	http://covenant.edu	GA
Crafton Hills College	http://craftonhills.edu	CA
Craven Community College	http://cravencc.edu	NC
Creighton University	http://creighton.edu	NE
Crowder College	http://crowder.edu	MO
Crown College	http://crown.edu	MN
Cuesta College	http://cuesta.edu	CA
Culinary Institute LeNotre	http://culinaryinstitute.edu	TX
Culinary Institute of America	http://ciachef.edu	NY
Culver-Stockton College	http://culver.edu	MO
Cumberland University	http://cumberland.edu	TN
Curry College	http://curry.edu	MA
Cuyahoga Community College	http://tri-c.edu	OH
Cuyamaca College	http://cuyamaca.edu	CA
Cypress College	http://cypresscollege.edu	CA
Dabney S. Lancaster Community College	http://dslcc.edu	VA
Dade Medical College	http://dadmedical.edu	FL
Daemen College	http://daemen.edu	NY
Dakota College at Bottineau	http://dakotacollege.edu	ND
Dakota County Technical College	http://dctc.edu	MN
Dakota State University	http://dsu.edu	SD
Dakota Wesleyan University	http://dwu.edu	SD
Dallas Baptist University	http://dbu.edu	TX
Dallas Nursing Institute	http://dni.edu	TX
Dalton State	http://daltonstate.edu	GA
Danville Area Community College	http://dacc.edu	IL
Dartmouth College	http://dartmouth.edu	NH
Darton State College	http://darton.edu	GA
Davenport University	http://davenport.edu	MI
Davidson College	http://davidson.edu	NC
Daytona State College	http://daytonastate.edu	FL
DeAnza College	http://deanza.edu	CA
DePaul University	http://depaul.edu	IL
DePauw University	http://depauw.edu	IN
DeSales University	http://desales.edu	PA
DeVry University	http://devry.edu	TN
Defiance College	http://defiance.edu	OH
Del Mar College	http://delmar.edu	TX
Delaware County Community College	http://dccc.edu	PA
Delaware State University	http://desu.edu	DE
Delaware Technical Community College	http://dtcc.edu	DE
Delaware Valley College	http://delval.edu	PA
Delhi State University of New York	http://delhi.edu	NY
Delta College	http://delta.edu	MI
Delta State University	http://deltastate.edu	MS
Denison University	http://denison.edu	OH
Des Moines Area Community College	http://dmacc.edu	IA
Diablo Valley College	http://dvc.edu	CA
Dickinson College	http://dickinson.edu	PA
DigiPen Institute of Technology	http://digipen.edu	WA
Divine Word College	http://dwci.edu	IA
Dixie State University	http://dixie.edu	UT
Dominican College	http://dc.edu	NY
Dominican School of Philosophy and Theology	http://dspt.edu	CA
Dominican University	http://dom.edu	IL
Dominican University of California	http://dominican.edu	CA
Dordt College	http://dordt.edu	IA
Douglas J. Aveda Institute	http://douglasj.edu	MI
Dowling College	http://dowling.edu	NY
Drake University	http://drake.edu	IA
Drew University	http://drew.edu	NJ
Drexel University	http://drexel.edu	PA
Drexel University College of Medicine	http://drexelmed.edu	PA
Drury University	http://drury.edu	MO
Duke University	http://duke.edu	NC
Duquesne University	http://duq.edu	PA
Durham Technical Community College	http://durhamtech.edu	NC
D’Youville College	http://dyc.edu	NY
Earlham College	http://earlham.edu	IN
East  Central University	http://ecok.edu	OK
East Carolina University	http://ecu.edu	NC
East Georgia State College	http://ega.edu	GA
East Los Angeles College	http://elac.edu	CA
East Mississippi Community College	http://eastms.edu	MS
East Stroudsburg University	http://esu.edu	PA
East Tennessee State University	http://etsu.edu	TN
East Texas Baptist University	http://etbu.edu	TX
Eastern Connecticut State University	http://easternct.edu	CT
Eastern Illinois University	http://eiu.edu	IL
Eastern Iowa Community Colleges	http://eicc.edu	IA
Eastern Kentucky University	http://eku.edu	KY
Eastern Mennonite University	http://emu.edu	VA
Eastern Michigan University	http://emich.edu	MI
Eastern New Mexico University	http://enmu.edu	NM
Eastern Oregon University	http://eou.edu	OR
Eastern University	http://eastern.edu	PA
Eastern Virginia Medical School	http://evms.edu	VA
Eastern Washington University	http://ewu.edu	WA
Eastern West Virgina Community and Technical College	http://easternwv.edu	WV
Eastwick College	http://eastwickcollege.edu	NJ
Eckerd College	http://eckerd.edu	FL
Edgewood College	http://edgewood.edu	WI
Edinboro University	http://edinboro.edu	PA
Edison State College	http://edison.edu	FL
Edmonds Community College	http://edcc.edu	WA
El Camino College	http://elcamino.edu	CA
El Camino College Compton Center	http://compton.edu	CA
El Paso Community College	http://epcc.edu	TX
Elim Bible Institute	http://elim.edu	NY
Elizabeth City State University	http://ecsu.edu	NC
Elizabethtown College	http://etown.edu	PA
Elmhurst College	http://elmhurst.edu	IL
Elmira College	http://elmira.edu	NY
Elms College	http://elms.edu	MA
Elon University	http://elon.edu	NC
Embry-Riddle Aeronautical University	http://erau.edu	FL
Emerson College	http://emerson.edu	MA
Emmanuel College	http://emmanuel.edu	MA
Emory University	http://emory.edu	GA
Empire State College	http://esc.edu	NY
Emporia State University	http://emporia.edu	KS
Endicott College	http://endicott.edu	MA
Enterprise State Community College	http://escc.edu	AL
Erie Community College State University of New York	http://ecc.edu	NY
Evangel University	http://evangel.edu	MO
Evangelical Seminary	http://evangelical.edu	PA
Everett Community College	http://everettcc.edu	WA
Everglades University	http://evergladesuniversity.edu	FL
Excelsior College	http://excelsior.edu	NY
Ex’pression College	http://expression.edu	CA
Fairfield University	http://fairfield.edu	CT
Fairleigh Dickinson University	http://fdu.edu	NJ
Fairmont State University	http://fairmontstate.edu	WV
Faith Evangelical College and Seminary	http://faithseminary.edu	WA
Farmingdale State College	http://farmingdale.edu	NY
Fashion Institute of Design & Merchandising	http://fidm.edu	CA
Fashion Institute of Technology	http://fitnyc.edu	NY
Faulkner State Community College	http://faulknerstate.edu	AL
Fayetteville Technical Community College	http://faytechcc.edu	NC
Felician College	http://felician.edu	NJ
Ferris State University	http://ferris.edu	MI
Ferrum College	http://ferrum.edu	VA
Fielding Graduate University	http://fielding.edu	CA
Finger Lakes Community College	http://flcc.edu	NY
Finlandia University	http://finlandia.edu	MI
Fisk University	http://fisk.edu	TN
Fitchburg State University	http://fitchburgstate.edu	MA
Five Towns College	http://ftc.edu	NY
Flagler College	http://flagler.edu	FL
Flathead Valley Community College	http://fvcc.edu	MT
Flint Hills Technical College	http://fhtc.edu	KS
Florence-Darlington Technical College	http://fdtc.edu	SC
Florida Atlantic University	http://fau.edu	FL
Florida Gulf Coast University	http://fgcu.edu	FL
Florida Institute of Technology	http://fit.edu	FL
Florida International University	http://fiu.edu	FL
Florida National University	http://fnu.edu	FL
Florida Southern College	http://flsouthern.edu	FL
Florida State College at Jacksonville	http://fscj.edu	FL
Florida State University	http://fsu.edu	FL
Fontbonne University	http://fontbonne.edu	MO
Foothill College	http://foothill.edu	CA
Foothill-De Anza Community College District	http://fhda.edu	CA
Fordham University	http://fordham.edu	NY
Forrest College	http://forrestcollege.edu	SC
Forsyth Technical Community College	http://forsythtech.edu	NC
Fort Hays State University	http://fhsu.edu	KS
Fort Lewis College	http://fortlewis.edu	CO
Fort Peck Community College	http://fpcc.edu	MT
Fort Scott Community College	http://fortscott.edu	KS
Fortis Institute	http://fortis.edu	NJ
Framingham State University	http://framingham.edu	MA
Francis Marion University	http://fmarion.edu	SC
Franklin & Marshall College	http://fandm.edu	PA
Franklin University	http://franklin.edu	OH
Frederick Community College	http://frederick.edu	MD
Frederick Taylor University	http://ftu.edu	CA
Fredonia University	http://fredonia.edu	NY
Freed-Hardeman University	http://fhu.edu	TN
Fresno City College	http://fresnocitycollege.edu	CA
Fresno Pacific University	http://fresno.edu	CA
Fresno State	http://fresnostate.edu	CA
Front Range Community College	http://frontrange.edu	CO
Frontier Nursing University	http://frontier.edu	KY
Frostburg State University	http://frostburg.edu	MD
Fuller Theological Seminary	http://fuller.edu	CA
Fullerton  College	http://fullcoll.edu	CA
Furman University	http://furman.edu	SC
Gadsden State  Community College	http://gadsdenstate.edu	AL
Galen College of Nursing	http://galencollege.edu	TX
Gallaudet University	http://gallaudet.edu	DC
Galveston College	http://gc.edu	TX
Garden City Community College	http://gcccks.edu	KS
Gardner-Webb University	http://gardner-webb.edu	NC
Garrett College	http://garrettcollege.edu	MD
Gaston College	http://gaston.edu	NC
Gateway Technical College	http://gtc.edu	WI
Gavilan College	http://gavilan.edu	CA
Geneseo University	http://geneseo.edu	NY
Geneva College	http://geneva.edu	PA
George Fox University	http://georgefox.edu	OR
George Mason University	http://gmu.edu	VA
Georgetown College	http://georgetowncollege.edu	KY
Georgetown University	http://georgetown.edu	DC
Georgia College	http://gcsu.edu	GA
Georgia Gwinnett College	http://ggc.edu	GA
Georgia Institute of Technology	http://gatech.edu	GA
Georgia Perimeter College	http://gpc.edu	GA
Georgia South Western State University	http://gsw.edu	GA
Georgia Southern University	http://georgiasouthern.edu	GA
Georgia State University	http://gsu.edu	GA
Georgian Court University	http://georgian.edu	NJ
Germanna Community College	http://germanna.edu	VA
Gettysburg College	http://gettysburg.edu	PA
Glendale Community College	http://gccaz.edu	AZ
Glendale Community College	http://glendale.edu	CA
Globe Institute of Technology	http://globe.edu	NY
Globe University	http://globeuniversity.edu	MN
Gnomon School of Visual Effects	http://gnomon.edu	CA
Golden Gate Baptist Theological Seminary	http://ggbts.edu	CA
Golden West College	http://goldenwestcollege.edu	CA
Goldey-Beacom College	http://gbc.edu	DE
Gonzaga University	http://gonzaga.edu	WA
Goodwin College	http://goodwin.edu	CT
Gordon College	http://gordon.edu	MA
Gordon Conwell Theological Seminary	http://gordonconwell.edu	MA
Goshen College	http://goshen.edu	IN
Goucher College	http://goucher.edu	MD
Governors State	http://govst.edu	IL
Grace College and Seminary	http://grace.edu	IN
Grand Canyon University	http://gcu.edu	AZ
Grand Rapids Community College	http://grcc.edu	MI
Grand Valley State University	http://gvsu.edu	MI
Granite State College	http://granite.edu	NH
Grayson College	http://grayson.edu	TX
Great Basin College	http://gbcnv.edu	NV
Green Mountain College	http://greenmtn.edu	VT
Green River Community College	http://greenriver.edu	WA
Greenville College	http://greenville.edu	IL
Grinnell College	http://grinnell.edu	IA
Grossmont College	http://grossmont.edu	CA
Grove City College	http://gcc.edu	PA
Guilford Technical Community College	http://gtcc.edu	NC
Gulf Coast State College	http://gulfcoast.edu	FL
Gustavus Adolphus College	http://gustavus.edu	MN
Hagerstown Community  College	http://hagerstowncc.edu	MD
Hamilton College	http://hamilton.edu	NY
Hamline University	http://hamline.edu	MN
Hampden-Sydney College	http://hsc.edu	VA
Hampshire College	http://hampshire.edu	MA
Hannibal-LaGrange	http://hlg.edu	MO
Hanover College	http://hanover.edu	IN
Harding University	http://harding.edu	AR
Harford Community College	http://harford.edu	MD
Harper College	http://harpercollege.edu	IL
Harris-Stowe State University	http://hssu.edu	MO
Harrisburg Area Community College	http://hacc.edu	PA
Harrison College	http://harrison.edu	IN
Hartford Seminary	http://hartsem.edu	CT
Hartnell College	http://hartnell.edu	CA
Hartwick College	http://hartwick.edu	NY
Harvard Business School	http://hbs.edu	MA
Harvard University	http://harvard.edu	MA
Harvey Mudd College	http://hmc.edu	CA
Haverford College	http://haverford.edu	PA
Hawkeye Community College	http://hawkeyecollege.edu	IA
Heartland Community College	http://heartland.edu	IL
Heidelberg University	http://heidelberg.edu	OH
Henderson State University	http://hsu.edu	AR
Hendrix College	http://hendrix.edu	AR
Henley-Putnam University	http://henley-putnam.edu	CA
Henry Ford College	http://hfcc.edu	MI
Heritage Bible College	http://heritagebiblecollege.edu	NC
Herkimer College	http://herkimer.edu	NY
Hesston College	http://hesston.edu	KS
High Point University	http://highpoint.edu	NC
Highland Community College	http://highlandcc.edu	KS
Highline College	http://highline.edu	WA
Hill College	http://hillcollege.edu	TX
Hillsborough Community College	http://hccfl.edu	FL
Hillsdale College	http://hillsdale.edu	MI
Hiram College	http://hiram.edu	OH
Hiwassee College	http://hiwassee.edu	TN
Hobart and William Smith Colleges	http://hws.edu	NY
Hocking College	http://hocking.edu	OH
Hofstra University	http://hofstra.edu	NY
Holy Cross College	http://hcc-nd.edu	IN
Holy Family University	http://holyfamily.edu	PA
Holy Names University	http://hnu.edu	CA
Hood College	http://hood.edu	MD
Hope College	http://hope.edu	MI
Houston Baptist University	http://hbu.edu	TX
Houston Community College	http://hccs.edu	TX
Howard College	http://howardcollege.edu	TX
Howard Community College	http://howardcc.edu	MD
Howard Payne University	http://hputx.edu	TX
Howard University	http://howard.edu	DC
Hudson Valley Community College	http://hvcc.edu	NY
Humboldt State University	http://humboldt.edu	CA
Humphreys College	http://humphreys.edu	CA
Huntingdon College	http://huntingdon.edu	AL
Huntington College of Health Sciences	http://hchs.edu	TN
Husson University	http://husson.edu	ME
IIT Chicago-Kent College of Law	http://iit.edu	IL
Icahn School of Medicine at Mount Sinai	http://mssm.edu	NY
Idaho State University	http://isu.edu	ID
Illinois Central College	http://icc.edu	IL
Illinois College of Optometry	http://ico.edu	IL
Illinois Institute of Technology	http://iit.edu	IL
Illinois Mathematics and Science Academy	http://imsa.edu	IL
Illinois State University	http://illinoisstate.edu	IL
Illinois Valley Community College	http://ivcc.edu	IL
Illinois Wesleyan University	http://iwu.edu	IL
Imperial Valley College	http://imperial.edu	CA
Indiana State University	http://indstate.edu	IN
Indiana University	http://indiana.edu	IN
Indiana University	http://iu.edu	IN
Indiana University Bloomington	http://iub.edu	IN
Indiana University East	http://iue.edu	IN
Indiana University Northwest	http://iun.edu	IN
Indiana University South Bend	http://iusb.edu	IN
Indiana University Southeast	http://ius.edu	IN
Indiana University of Pennsylvania	http://iup.edu	PA
Indiana University – Purdue University Fort Wayne	http://ipfw.edu	IN
Indiana University – Purdue University Indianapolis	http://iupui.edu	IN
Indiana Wesleyan University	http://indwes.edu	IN
Institute of Design and Construction	http://idc.edu	NY
Institute of Production and Recording	http://ipr.edu	MN
Interactive College of Technology	http://ict.edu	GA
International Sports Sciences Association	http://issaonline.edu	CA
International Technological University	http://itu.edu	CA
Inver Hills Community College	http://inverhills.edu	MN
Iona College	http://iona.edu	NY
Iowa Central Community College	http://iowacentral.edu	IA
Iowa State University	http://iastate.edu	IA
Iowa Wesleyan College	http://iwc.edu	IA
Iowa Western Community College	http://iwcc.edu	IA
Irvine Valley College	http://ivc.edu	CA
Isothermal Community College	http://isothermal.edu	NC
Itawamba Community College	http://iccms.edu	MS
Ithaca College	http://ithaca.edu	NY
Ivy Tech Community College	http://ivytech.edu	IN
Jackson College	http://jccmi.edu	MI
Jackson State Community College	http://jscc.edu	TN
Jackson State University	http://jsums.edu	MS
Jacksonville State University	http://jsu.edu	AL
Jacksonville University	http://ju.edu	FL
James Madison University	http://jmu.edu	VA
Jamestown Community College	http://sunyjcc.edu	NY
Jefferson College	http://jeffco.edu	MO
John A. Logan College	http://jalc.edu	IL
John Brown University	http://jbu.edu	AR
John Carroll University	http://jcu.edu	OH
John F. Kennedy University	http://jfku.edu	CA
Johns Hopkins Bloomberg School of Public Health	http://jhsph.edu	MD
Johns Hopkins School of Advanced International Studies	http://sais-jhu.edu	DC
Johns Hopkins University	http://jhu.edu	MD
Johnson County Community College	http://jccc.edu	KS
Johnson State College	http://jsc.edu	VT
Johnson University	http://johnsonu.edu	TN
Johnson and Wales University	http://jwu.edu	RI
Joliet Junior College	http://jjc.edu	IL
Jones International University	http://jiu.edu	CO
Joseph’s College	http://josephscollege.edu	NE
Judson University	http://judsonu.edu	IL
Juniata College	http://juniata.edu	PA
Kalamazoo College	http://kzoo.edu	MI
Kalamazoo Valley Community College	http://kvcc.edu	MI
Kankakee Community College	http://kcc.edu	IL
Kansas City Kansas Community College	http://kckcc.edu	KS
Kansas City University of Medicine and Biosciences	http://kcumb.edu	MO
Kansas State University	http://k-state.edu	KS
Kaplan University	http://kaplanuniversity.edu	IA
Kaskaskia College	http://kaskaskia.edu	IL
Kean University	http://kean.edu	NJ
Keck Graduate Institute	http://kgi.edu	CA
Keene State College	http://keene.edu	NH
Keiser University	http://keiseruniversity.edu	FL
Kennesaw State University	http://kennesaw.edu	GA
Kent State University	http://kent.edu	OH
Kentucky Christian University	http://kcu.edu	KY
Kentucky Community and Technical College System	http://kctcs.edu	KY
Kentucky State University	http://kysu.edu	KY
Kenyon College	http://kenyon.edu	OH
Kettering College	http://kc.edu	OH
Kettering University	http://kettering.edu	MI
Keuka College	http://keuka.edu	NY
Keystone College	http://keystone.edu	PA
King University	http://king.edu	TN
King’s College	http://kings.edu	PA
Kirkwood Community College	http://kirkwood.edu	IA
Kishwaukee College	http://kishwaukeecollege.edu	IL
Knox College	http://knox.edu	IL
Kutztown University	http://kutztown.edu	PA
LSU Health Sciences Center – New Orleans	http://lsuhsc.edu	LA
LSU Health Sciences Center – New Orleans	http://lsuhscshreveport.edu	LA
La Roche College	http://laroche.edu	PA
La Salle University	http://lasalle.edu	PA
La Sierra University	http://lasierra.edu	CA
Lackawanna College	http://lackawanna.edu	PA
Lafayette College	http://lafayette.edu	PA
Lake Erie College of Osteopathic Medicine	http://lecom.edu	PA
Lake Forest College	http://lakeforest.edu	IL
Lake Michigan College	http://lakemichigancollege.edu	MI
Lake Sumter State College	http://lssc.edu	FL
Lake Superior State University	http://lssu.edu	MI
Lake Tahoe Community College	http://ltcc.edu	CA
Lakeland Community College	http://lakelandcc.edu	OH
Lakeview College of Nursing	http://lakeviewcol.edu	IL
Lamar Institute of Technology	http://lit.edu	TX
Lamar State College – Orange	http://lsco.edu	TX
Lamar State College – Port Arthur	http://lamarpa.edu	TX
Lamar University	http://lamar.edu	TX
Lancaster Bible College	http://lbc.edu	PA
Lancaster County Career and Technology Center	http://lancasterctc.edu	PA
Lancaster Theological Seminary	http://lancasterseminary.edu	PA
Lander University	http://lander.edu	SC
Lane Community College	http://lanecc.edu	OR
Laney  College	http://laney.edu	CA
Langston University	http://langston.edu	OK
Lanier Technical College	http://laniertech.edu	GA
Lansdale School of Business	http://lsb.edu	PA
Lansing Community College	http://lcc.edu	MI
Las Positas College	http://laspositascollege.edu	CA
Laurus College	http://lauruscollege.edu	CA
Lawrence Technological University	http://ltu.edu	MI
Lawrence University	http://lawrence.edu	WI
La’ James College	http://lajames.edu	IA
Le Moyne	http://lemoyne.edu	NY
LeTourneau University	http://letu.edu	TX
Lebanon Valley College	http://lvc.edu	PA
Lee University	http://leeuniversity.edu	TN
Leech Lake Tribal College	http://lltc.edu	MN
Lees McRae College	http://lmc.edu	NC
Lehigh Carbon Community College	http://lccc.edu	PA
Lehigh University	http://lehigh.edu	PA
Lehman College	http://lehman.edu	NY
Lenoir Community College	http://lenoircc.edu	NC
Lesley University	http://lesley.edu	MA
Lewis University	http://lewisu.edu	IL
Lewis and Clark	http://lclark.edu	OR
Lewis and Clark Community College	http://lc.edu	IL
Liberty University	http://liberty.edu	VA
Life Chiropractic College West	http://lifewest.edu	CA
Life University	http://life.edu	GA
Lim College	http://limcollege.edu	NY
Lima Central Catholic High School	http://lcchs.edu	OH
Limestone College	http://limestone.edu	SC
Lincoln Land Community College	http://llcc.edu	IL
Lincoln Memorial University	http://lmunet.edu	TN
Lincoln University	http://lincolne.edu	MO
Lindenwood University	http://lindenwood.edu	MO
Lindsey Wilson College	http://lindsey.edu	KY
Linfield College	http://linfield.edu	OR
Linn State Technical College	http://linnstate.edu	MO
Linn-Benton Community College	http://linnbenton.edu	OR
Little Priest Tribal College	http://littlepriest.edu	NE
Lock Haven University	http://lhup.edu	PA
Loma Linda University	http://llu.edu	CA
Lone Star College System	http://lonestar.edu	TX
Long Beach City College	http://lbcc.edu	CA
Long Island University	http://liu.edu	NY
Longwood University	http://longwood.edu	VA
Lorain County Community College	http://lorainccc.edu	OH
Loraines Academy Incorporated	http://lorainesacademy.edu	FL
Loras College	http://loras.edu	IA
Los Angeles City College	http://lacitycollege.edu	CA
Los Angeles Community College District	http://laccd.edu	CA
Los Angeles Harbor College	http://lahc.edu	CA
Los Angeles Mission College	http://lamission.edu	CA
Los Angeles Southwest College	http://lasc.edu	CA
Los Angeles Trade-Tech Community College	http://lattc.edu	CA
Los Angeles Valley College	http://lavc.edu	CA
Los Medanos College	http://losmedanos.edu	CA
Los Rios Community College District	http://losrios.edu	CA
Louisiana Culinary Institute	http://lci.edu	LA
Louisiana State University	http://lsu.edu	LA
Louisiana State University System	http://lsusystem.edu	LA
Louisiana State University – Eunice	http://lsue.edu	LA
Louisiana Tech University	http://latech.edu	LA
Loyola Marymount University	http://lmu.edu	CA
Loyola University Chicago	http://luc.edu	IL
Loyola University Maryland	http://loyola.edu	MD
Loyola University New Orleans	http://loyno.edu	LA
Lubbock Christian University	http://lcu.edu	TX
Lurleen B. Wallace Community College	http://lbwcc.edu	AL
Luther College	http://luther.edu	IA
Luther Seminary	http://luthersem.edu	MN
Lycoming College	http://lycoming.edu	PA
Lynn University	http://lynn.edu	FL
Lyon College	http://lyon.edu	AR
MGH Institute of Health Professions	http://mghihp.edu	MA
Macalester College	http://macalester.edu	MN
Macomb Community College	http://macomb.edu	MI
Madison Area Technical College	http://madisoncollege.edu	WI
Maharishi University of Management	http://mum.edu	IA
Maine Maritime Academy	http://mainemaritime.edu	ME
Malone University	http://malone.edu	OH
Manchester Community College	http://mccnh.edu	NH
Manchester University	http://manchester.edu	IN
Manhattan College	http://manhattan.edu	NY
Manhattanville College	http://mville.edu	NY
Manor College	http://manor.edu	PA
Mansfield University	http://mansfield.edu	PA
Marian University Indianapolis	http://marian.edu	IN
Maricopa Community Colleges	http://maricopa.edu	AZ
Marietta College	http://marietta.edu	OH
Marine Biological Laboratory	http://mbl.edu	MA
Marist College	http://marist.edu	NY
Marquette University	http://marquette.edu	WI
Marshall University	http://marshall.edu	WV
Marygrove College	http://marygrove.edu	MI
Maryland Institute College of Art	http://mica.edu	MD
Maryland University of Integrative Health	http://muih.edu	MD
Marylhurst University	http://marylhurst.edu	OR
Marymount California University	http://marymountcalifornia.edu	CA
Marymount Manhattan College	http://mmm.edu	NY
Marymount University	http://marymount.edu	VA
Maryville University	http://maryville.edu	MO
Marywood University	http://marywood.edu	PA
MassBay Community College	http://massbay.edu	MA
Massachusetts College of Art and Design	http://massart.edu	MA
Massachusetts Department of Higher Education	http://mass.edu	MA
Massachusetts Institute of Technology	http://mit.edu	MA
Massachusetts Maritime Academy	http://maritime.edu	MA
Mayville State University	http://mayvillestate.edu	ND
McDaniel College	http://mcdaniel.edu	MD
McHenry County College	http://mchenry.edu	IL
McKendree University	http://mckendree.edu	IL
McLennan Community College	http://mclennan.edu	TX
McMurry University	http://mcm.edu	TX
McNally Smith College of Music	http://mcnallysmith.edu	MN
McPherson College	http://mcpherson.edu	KS
Medical College of Wisconsin	http://mcw.edu	WI
Medical University of South Carolina	http://musc.edu	SC
Merced Community College	http://mccd.edu	CA
Mercer County Community  College	http://mccc.edu	NJ
Mercer University	http://mercer.edu	GA
Mercy College	http://mercy.edu	NY
Mercyhurst University	http://mercyhurst.edu	PA
Meridian Technology Center	http://meridiantech.edu	OK
Merrimack College	http://merrimack.edu	MA
Merrimack Education Center	http://mec.edu	MA
Mesa Community College	http://mesacc.edu	AZ
Mesabi Range College	http://mesabirange.edu	MN
Messiah College	http://messiah.edu	PA
Methodist University	http://methodist.edu	NC
Metropolitan College of New York	http://mcny.edu	NY
Metropolitan Community College	http://mcckc.edu	MO
Metropolitan State University	http://metrostate.edu	MN
Metropolitan State University of Denver	http://msudenver.edu	CO
Miami Dade College	http://mdc.edu	FL
Miami International University of Art and Design	http://mymiu.edu	FL
Miami University	http://miamioh.edu	OH
Michigan State University	http://msu.edu	MI
Michigan Technological University	http://mtu.edu	MI
Mid-America Christian University	http://macu.edu	OK
Mid-Pacific Institute	http://midpac.edu	HI
Mid-Plains Community College	http://mpcc.edu	NE
Mid-South Community College	http://midsouthcc.edu	AR
Middle Georgia State College	http://mga.edu	GA
Middle Tennessee State University	http://mtsu.edu	TN
Middlebury College	http://middlebury.edu	VT
Middlesex Community College	http://mxcc.edu	MA
Middlesex County College	http://middlesexcc.edu	NJ
Middlesex School	http://mxschool.edu	MA
Midland College	http://midland.edu	TX
Midlands Technical College	http://midlandstech.edu	SC
Midway College	http://midway.edu	KY
Midwestern  State University	http://mwsu.edu	TX
Midwestern Career College	http://mccollege.edu	IL
Midwestern University	http://midwestern.edu	IL
Miles Community College	http://milescc.edu	MT
Millennia Atlantic University	http://maufl.edu	FL
Millersville University	http://millersville.edu	PA
Milligan College	http://milligan.edu	TN
Mills College	http://mills.edu	CA
Milton Academy	http://milton.edu	MA
Milwaukee Area Technical College	http://matc.edu	WI
Milwaukee Institute of Art and Design	http://miad.edu	WI
Milwaukee School of Engineering	http://msoe.edu	WI
Mineral Area College	http://mineralarea.edu	MO
Minnesota State University Mankato	http://mnsu.edu	MN
Minnesota State University Moorhead	http://mnstate.edu	MN
Minot State University	http://minotstateu.edu	ND
MiraCosta College	http://miracosta.edu	CA
Misericordia University	http://misericordia.edu	PA
Mississippi Gulf Coast Community College	http://mgccc.edu	MS
Mississippi State University	http://mssstate.edu	MS
Missouri Southern State  University	http://mssu.edu	MO
Missouri State University	http://missouristate.edu	MO
Missouri University of Science and Technology	http://mst.edu	MO
Missouri Valley College	http://moval.edu	MO
Mizzou University of Missouri	http://missouri.edu	MO
Modesto Junior College	http://mjc.edu	CA
Monmouth College	http://monmouthcollege.edu	IL
Monmouth University	http://monmouth.edu	NJ
Monroe Community College	http://monroecc.edu	NY
Monroe County Community College	http://monroeccc.edu	MI
Montana State University	http://montana.edu	MT
Montana State University Billings	http://msubillings.edu	MT
Montana State University – Northern	http://msun.edu	MT
Montana Tech of the University of Montana	http://mtech.edu	MT
Montana University System	http://mus.edu	MT
Montclair State University	http://montclair.edu	NJ
Monterey Institute of International Studies	http://miis.edu	CA
Montgomery Blair High School	http://mbhs.edu	MD
Montgomery College	http://montgomerycollege.edu	MD
Montgomery Community College	http://montgomery.edu	NC
Montgomery County Community College	http://mc3.edu	PA
Montserrat College of Art	http://montserrat.edu	MA
Moraine Park Technical College	http://morainepark.edu	WI
Moraine Valley Community College	http://morainevalley.edu	IL
Moravian College	http://moravian.edu	PA
Morehead State University	http://moreheadstate.edu	KY
Morehouse College	http://morehouse.edu	GA
Morehouse School of Medicine	http://msm.edu	GA
Morrisville State College	http://morrisville.edu	NY
Morton College	http://morton.edu	IL
Mount Aloysius College	http://mtaloy.edu	PA
Mount Holyoke College	http://mtholyoke.edu	MA
Mount Ida College	http://mountida.edu	MA
Mount Marty College	http://mtmc.edu	SD
Mount Saint Joseph University	http://msj.edu	OH
Mount Saint Marry College	http://msmc.edu	NY
Mount Saint Mary’s College	http://la.edu	CA
Mount Saint Mary’s University	http://msmary.edu	MD
Mount San Antonio College	http://mtsac.edu	CA
Mount San Jacinto College	http://msjc.edu	CA
Mount Vernon Nazarene University	http://mvnu.edu	OH
Mount Washington College	http://mountwashington.edu	NH
Muhlenberg College	http://muhlenberg.edu	PA
Mukogawa Fort Wright Institute	http://mfwi.edu	WA
Murray State University	http://murraystate.edu	KY
Muskingum University	http://muskingum.edu	OH
NHTI Concord’s Community College	http://nhti.edu	NH
Napa Valley College	http://napavalley.edu	CA
Naropa University	http://naropa.edu	CO
Nashua Community College	http://nashuacc.edu	NH
Nashville State Community College	http://nscc.edu	TN
Nassau Community College	http://ncc.edu	NY
National American University	http://national.edu	TX
National College of Natural Medicine	http://ncnm.edu	OR
National Louis University	http://nl.edu	IL
National Outdoor Leadership School	http://nols.edu	WY
National Park Community College	http://npcc.edu	AK
National University of Health Sciences	http://nuhs.edu	FL
Naval Postgraduate School	http://nps.edu	CA
Nazarene Theological Seminary	http://nts.edu	MO
Nazareth College	http://naz.edu	NY
Neosho County Community College	http://neosho.edu	KS
Neumann University	http://neumann.edu	PA
New College of Florida	http://ncf.edu	FL
New England College	http://nec.edu	NH
New England Culinary Institute	http://neci.edu	VT
New England Institute of Technology	http://neit.edu	RI
New England Law – Boston	http://nesl.edu	MA
New Jersey City University	http://njcu.edu	NJ
New Jersey Institute of Technology	http://njit.edu	NJ
New Life Theological Seminary	http://nlts.edu	NC
New Mexico Highlands University	http://nmhu.edu	NM
New Mexico Institute of Mining and Technology	http://nmt.edu	NM
New Mexico State University	http://nmsu.edu	NM
New Mexico State University Alamogordo	http://nmsua.edu	NM
New Orleans Baptist Theological Seminary	http://nobts.edu	LA
New Paltz	http://newpaltz.edu	NY
New River Community College	http://nr.edu	VA
New York College of Health Professions	http://nycollege.edu	NY
New York Film Academy	http://nyfa.edu	NY
New York Institute of Technology	http://nyit.edu	NY
New York University	http://nyu.edu	NY
NewSchool of Architecture and Design	http://newschoolarch.edu	CA
Newberry College	http://newberry.edu	SC
Newman University	http://newmanu.edu	KS
Niagara University	http://niagara.edu	NY
Nicholls State University	http://nicholls.edu	LA
Norco College	http://norcocollege.edu	CA
Norfolk State University	http://nsu.edu	VA
Normandale Community College	http://normandale.edu	MN
North American University	http://northamerican.edu	TX
North Arkansas College	http://northark.edu	AR
North Bennet Street School	http://nbss.edu	MA
North Carolina Central University	http://nccu.edu	NC
North Carolina School of Science and Mathematics	http://ncssm.edu	NC
North Carolina State University	http://ncsu.edu	NC
North Carolina Wesleyan College	http://ncwc.edu	NC
North Central Missouri College	http://ncmissouri.edu	MO
North Central State College	http://ncstatecollege.edu	OH
North Central Texas College	http://nctc.edu	TX
North Dakota State University	http://ndsu.edu	ND
North Dakota University System	http://ndus.edu	ND
North Florida Community College	http://nfcc.edu	FL
North Georgia Technical College	http://northgatech.edu	GA
North Greenville University	http://ngu.edu	SC
North Hennepin Community College	http://nhcc.edu	MN
North Lake College	http://northlakecollege.edu	TX
North Park University	http://northpark.edu	IL
North Seattle College	http://northseattle.edu	WA
Northampton Community College	http://northampton.edu	PA
Northcentral  Technical College	http://ntc.edu	WI
Northeast Alabama Community College	http://nacc.edu	AL
Northeast Community College	http://northeast.edu	NE
Northeast Iowa Community  College	http://nicc.edu	IA
Northeast Mississippi Community College	http://nemcc.edu	MS
Northeast Wisconsin Technical College	http://nwtc.edu	WI
Northeastern Illinois University	http://neiu.edu	IL
Northeastern State University	http://nsuok.edu	OK
Northeastern University	http://northeastern.edu	MA
Northern Arizona University	http://nau.edu	AZ
Northern Illinois University	http://niu.edu	IL
Northern Kentucky University	http://nku.edu	KY
Northern Maine Community College	http://nmcc.edu	ME
Northern Michigan University	http://nmu.edu	MI
Northern New Mexico College	http://nnmc.edu	NM
Northern State University	http://northern.edu	SD
Northern Virginia Community College	http://nvcc.edu	VA
Northern Wyoming Community College District	http://sheridan.edu	WY
Northland College	http://northland.edu	WI
Northland Pioneer  College	http://npc.edu	AZ
Northwest Arkansas Community College	http://nwacc.edu	AR
Northwest College	http://northwestcollege.edu	WY
Northwest Florida State College	http://nwfsc.edu	FL
Northwest Missouri State University	http://nwmissouri.edu	MO
Northwest Technical Institute	http://nwti.edu	AR
Northwest-Shoals Community College	http://nwscc.edu	AL
Northwestern Michigan College	http://nmc.edu	MI
Northwestern Oklahoma State University	http://nwosu.edu	OK
Northwestern University	http://northwestern.edu	IL
Norwich  University	http://norwich.edu	VT
Notre Dame de Namur University	http://ndnu.edu	CA
Nova Southeastern University	http://nova.edu	FL
Nunez Community College	http://nunez.edu	LA
Nyack College	http://nyack.edu	NY
Oakland City University	http://oak.edu	IN
Oakland Community College	http://oaklandcc.edu	MI
Oakland Univeristy	http://oakland.edu	MI
Oakton Community College	http://oakton.edu	IL
Oakwood University	http://oakwood.edu	AL
Oberlin College and Conservatory	http://oberlin.edu	OH
Occidental College	http://oxy.edu	CA
Ocean County College	http://ocean.edu	NJ
Odessa College	http://odessa.edu	TX
Ogle School	http://ogleschool.edu	TX
Oglethorpe University	http://oglethorpe.edu	GA
Ohio Dominican University	http://ohiodominican.edu	OH
Ohio Northern University	http://onu.edu	OH
Ohio State University	http://osu.edu	OH
Ohio University	http://ohio.edu	OH
Ohio Valley University	http://ovu.edu	WV
Ohio Wesleyan University	http://owu.edu	OH
Ohlone College	http://ohlone.edu	CA
Okefenokee Technical College	http://okefenokeetech.edu	GA
Oklahoma Christian University	http://oc.edu	OK
Oklahoma City Community College	http://occc.edu	OK
Oklahoma City University	http://okcu.edu	OK
Oklahoma State University	http://okstate.edu	OK
Oklahoma State University	http://osuokc.edu	OK
Oklahoma State University Institue of Technology	http://osuit.edu	OK
Old Dominion University	http://odu.edu	VA
Olin College of Engineering	http://olin.edu	MA
Olivet Nazarene University	http://olivet.edu	IL
Olympic College	http://olympic.edu	WA
Oral Roberts University	http://oru.edu	OK
Orange Coast College	http://orangecoastcollege.edu	CA
Orange County Community College	http://sunyorange.edu	NY
Orangeburg-Calhoun Technical College	http://octech.edu	SC
Oregon Health and Science University	http://ohsu.edu	OR
Oregon State University	http://oregonstate.edu	OR
Otis College of Art and Design	http://otis.edu	CA
Otterbein University	http://otterbein.edu	OH
Ouachita Baptist University	http://obu.edu	AR
Our Lady of the Lake University	http://ollusa.edu	TX
Owens Community College	http://owens.edu	OH
Ozarks Technical Community College	http://otc.edu	MO
Pace University	http://pace.edu	NY
Pacific College of Oriental Medicine	http://pacificcollege.edu	CA
Pacific Lutheran  Theological Seminary	http://plts.edu	CA
Pacific Lutheran University	http://plu.edu	WA
Pacific School of Religion	http://psr.edu	CA
Pacific University Oregon	http://pacificu.edu	OR
Paine College	http://paine.edu	GA
Palm Beach Atlantic University	http://pba.edu	FL
Palm Beach State College	http://palmbeachstate.edu	FL
Palmer College of Chiropractic	http://palmer.edu	IA
Palomar College	http://palomar.edu	CA
Panola College	http://panola.edu	TX
Park University	http://park.edu	MO
Parkland College	http://parkland.edu	IL
Pasadena City College	http://pasadena.edu	CA
Pasco-Hernando State College	http://phsc.edu	FL
Passaic County Community College	http://pccc.edu	NJ
Patty Hands Shelton School of Nursing	http://phssn.edu	TX
Paul Smith’s College	http://paulsmiths.edu	NY
Pearl River Community College	http://prcc.edu	MS
Pellissippi State Community College	http://pstcc.edu	TN
Peninsula College	http://pencol.edu	WA
Penn State University	http://psu.edu	PA
Pennsylvania Academy of the Fine Arts	http://pafa.edu	PA
Pennsylvania College of Technology	http://pct.edu	PA
Pennsylvania Gunsmith School	http://pagunsmith.edu	PA
Pensacola State College	http://pensacolastate.edu	FL
Pepperdine University	http://pepperdine.edu	CA
Peralta Community College District	http://peralta.edu	CA
Perry Technical Institute	http://perrytech.edu	WA
Pfeiffer University	http://pfeiffer.edu	GA
Philadelphia College of Osteopathic Medicine	http://pcom.edu	PA
Philadelphia University	http://philau.edu	PA
Phillips Community College U of A	http://pccua.edu	AR
Phillips Exeter Academy	http://exeter.edu	NH
Phoenix College	http://phoenixcollege.edu	AZ
Piedmont College	http://piedmont.edu	GA
Piedmont Community College	http://piedmontcc.edu	NC
Pierce College	http://piercecollege.edu	CA
Pierpont Community and Technical College	http://pierpont.edu	WV
Pikes Peak Community College	http://ppcc.edu	CO
Pima Community College	http://pima.edu	AZ
Pima Medical Institute	http://pmi.edu	NV
Pitt Community College	http://pittcc.edu	NC
Pittsburg State University	http://pittstate.edu	KS
Pitzer College	http://pitzer.edu	CA
Plymouth State University	http://plymouth.edu	NH
Point Loma Nazarene University	http://pointloma.edu	CA
Pomona College	http://pomona.edu	CA
Porterville College	http://portervillecollege.edu	CA
Portland Community College	http://pcc.edu	OR
Portland State University	http://pdx.edu	OR
Prairie State College	http://prairiestate.edu	IL
Prairie View A&M University	http://pvamu.edu	TX
Pratt Institute	http://pratt.edu	NY
Presbyterian College	http://presby.edu	SC
Prescott College	http://prescott.edu	AZ
Prince George’s Community College	http://pgcc.edu	MD
Princeton Theological Seminary	http://ptsem.edu	NJ
Princeton University	http://princeton.edu	NJ
Principia College	http://principiacollege.edu	IL
Providence College	http://providence.edu	RI
Pueblo Community College	http://pueblocc.edu	CO
Pulaski Technical College	http://pulaskitech.edu	AR
Purchase College	http://purchase.edu	NY
Purdue University	http://purdue.edu	IN
Purdue University Calumet	http://purduecal.edu	IN
Purdue University North Central	http://pnc.edu	IN
Queens University of Charlotte	http://queens.edu	NC
Queens University of Charlotte	http://quinnipiac.edu	CT
Quinebaug Valley Community College	http://qvcc.edu	CT
Radford University	http://radford.edu	VA
Ramapo College of New Jersey	http://ramapo.edu	NJ
Randolph College	http://randolphcollege.edu	VA
Randolph Community College	http://randolph.edu	NC
Randolph-Macon College	http://rmc.edu	VA
Rappahannock Community College	http://rappahannock.edu	VA
Raritan Valley Community College	http://raritanval.edu	NJ
Rasmussen College	http://rasmussen.edu	MN
Reading Area Community College	http://racc.edu	PA
Red Rocks Community College	http://rrcc.edu	CO
Redstone College	http://redstone.edu	CO
Reed College	http://reed.edu	OR
Reformed Theological Seminary	http://rts.edu	MS
Regent University	http://regent.edu	VA
Regis University	http://regis.edu	CO
Reinhardt University	http://reinhardt.edu	GA
Rensselaer Polytechnic Institute	http://rpi.edu	NY
Renton Technical College	http://rtc.edu	WA
Resurrection University	http://resu.edu	IL
Reynolds Community College	http://reynolds.edu	VA
Rhode Island College	http://ric.edu	RI
Rhodes College	http://rhodes.edu	TN
Rhose Island School of Design	http://risd.edu	RI
Rice University	http://rice.edu	TX
Richland College	http://richlandcollege.edu	TX
Rider University	http://rider.edu	NJ
Ridgewater College	http://ridgewater.edu	MN
Ringling College of Art and Design	http://ringling.edu	FL
Rio Hondo College	http://riohondo.edu	CA
Rio Salado College	http://riosalado.edu	AZ
Riverside City College	http://rcc.edu	CA
Riverside Community College District	http://rccd.edu	CA
Rivier University	http://rivier.edu	NH
Roane State Community College	http://roanestate.edu	TN
Roanoke College	http://roanoke.edu	VA
Roanoke-Chowan Community College	http://roanokechowan.edu	NC
Robert Morris University	http://rmu.edu	PA
Robert Morris University Illinois	http://robertmorris.edu	IL
Roberts Wesleyan College	http://roberts.edu	NY
Rochester Institute of Technology	http://rit.edu	NY
Rock Valley College	http://rockvalleycollege.edu	IL
Rockford University	http://rockford.edu	IL
Rockhurst University	http://rockhurst.edu	MO
Rockland Community College	http://sunyrockland.edu	NY
Rocky Mountain College	http://rocky.edu	MT
Roger Williams University	http://rwu.edu	RI
Rogers State University	http://rsu.edu	OK
Rogue Community College	http://roguecc.edu	OR
Rollins College	http://rollins.edu	FL
Roosevelt University	http://roosevelt.edu	IL
Rosalind Franklin University	http://rosalindfranklin.edu	IL
Rose State College	http://rose.edu	OK
Rose-Hulman Institute of Technology	http://rose-hulman.edu	IN
Rosemead College	http://rosemeadcollege.edu	CA
Ross University	http://rossu.edu	NJ
Rowan University	http://rowan.edu	NJ
Rutgers University	http://rutgers.edu	NJ
Sacred Heart University	http://sacredheart.edu	CT
Saddleback College	http://saddleback.edu	CA
Saginaw Chippewa Tribal College	http://sagchip.edu	MI
Saginaw Valley State University	http://svsu.edu	MI
Saint Ambrose University	http://sau.edu	IA
Saint Andrews University	http://sapc.edu	NC
Saint Anselm College	http://anselm.edu	NH
Saint Anthony College of Nursing	http://sacn.edu	IL
Saint Augustine’s University	http://st-aug.edu	NC
Saint Bernard’s School of Theology and Ministry	http://stbernards.edu	NY
Saint Bonaventure University	http://sbu.edu	NY
Saint Catharine College	http://sccky.edu	KY
Saint Charles Community College	http://stchas.edu	MO
Saint Cloud State  University	http://stcloudstate.edu	MN
Saint Edward’s University	http://stedwards.edu	TX
Saint Francis Medical Center College of Nursing	http://sfmccon.edu	IL
Saint Francis University	http://francis.edu	PA
Saint James School	http://stjames.edu	MD
Saint John Fisher College	http://sjfc.edu	NY
Saint John’s College	http://sjc.edu	MD
Saint John’s College	http://stjohnscollegespringfield.edu	Ill
Saint John’s University	http://stjohns.edu	NY
Saint Joseph’s College	http://sjcme.edu	ME
Saint Joseph’s University	http://sju.edu	PA
Saint Lawrence University	http://stlawu.edu	NY
Saint Leo University	http://saintleo.edu	FL
Saint Louis Community College	http://stlcc.edu	MO
Saint Louis University	http://slu.edu	MO
Saint Martin’s University	http://stmartin.edu	WA
Saint Mary’s College	http://saintmarys.edu	IN
Saint Mary’s College	http://stmarys-ca.edu	CA
Saint Mary’s College of Maryland	http://smcm.edu	MD
Saint Mary’s University	http://stmarytx.edu	TX
Saint Mary’s University of Minnesota	http://smumn.edu	MN
Saint Michael’s College	http://smcvt.edu	VT
Saint Norbert College	http://snc.edu	WI
Saint Olaf College	http://stolaf.edu	MN
Saint Paul School of Theology and Ministry	http://spst.edu	KS
Saint Petersburg College	http://spcollege.edu	FL
Saint Thomas University	http://stu.edu	FL
Saint Vincent College	http://stvincent.edu	PA
Saint Vincent Seminary	http://saintvincentseminary.edu	PA
Saint Vincent de Paul Regional Seminary	http://svdp.edu	FL
Saint Xavier University	http://scu.edu	IL
Salem College	http://salem.edu	NC
Salem State University	http://salemstate.edu	MA
Salisbury University	http://salisbury.edu	MD
Salt Lake Community College	http://slcc.edu	UT
Salus University	http://salus.edu	PA
Sam Houston State University	http://shsu.edu	TX
Samford University	http://samford.edu	AL
Sampson Community College	http://sampsoncc.edu	NC
San Bernardino Valley College	http://valleycollege.edu	CA
San Diego City College	http://sdcity.edu	CA
San Diego Mesa College	http://sdmesa.edu	CA
San Diego State University	http://sdsu.edu	CA
San Francisco State University	http://sfsu.edu	CA
San Jacinto College	http://sanjac.edu	TX
San Joaquin Delta College	http://deltacollege.edu	CA
San Jose State University	http://sjsu.edu	CA
San Juan College	http://sanjuancollege.edu	NM
San Mateo County Community College	http://smccd.edu	CA
Sandhills Community College	http://sandhills.edu	NC
Santa Ana College	http://sac.edu	CA
Santa Barbara City College	http://sbcc.edu	CA
Santa Clara University	http://scu.edu	CA
Santa Fe College	http://sfcollege.edu	FL
Santa Monica College	http://smc.edu	CA
Santa Rosa Junior College	http://santarosa.edu	CA
Sarah Lawrence College	http://slc.edu	NY
Savannah College of Art and Design	http://scad.edu	GA
Savannah State University	http://savannahstate.edu	GA
School for International Training	http://sit.edu	VT
School of Continuing Education	http://sce.edu	CA
School of the Art Institute of Chicago	http://saic.edu	IL
Schreiner University	http://schreiner.edu	TX
Scripps College	http://scrippscollege.edu	CA
Seattle Central College	http://seattlecentral.edu	WA
Seattle Institute of Oriental Medicine	http://siom.edu	WA
Seattle Pacific University	http://spu.edu	WA
Seattle University	http://seattleu.edu	WA
Seminary of the Southwest	http://ssw.edu	TX
Seminole State College of Florida	http://seminolestate.edu	FL
Sentara College of Health Sciences	http://sentara.edu	VA
Seton Hall University	http://shu.edu	NJ
Sewanee The University of the South	http://sewanee.edu	TN
Shasta College	http://shastacollege.edu	CA
Shaw University	http://shawu.edu	NC
Shawnee Community College	http://shawneecc.edu	IL
Shawnee State University	http://shawnee.edu	OH
Shenandoah University	http://su.edu	VA
Shepherd University	http://shepherd.edu	WV
Shippensburg University	http://ship.edu	PA
Shoreline Community College	http://shoreline.edu	WA
Shorter University	http://shorter.edu	GA
Siena College	http://siena.edu	NY
Sierra College	http://sierracollege.edu	CA
Sierra Nevada College	http://sierranevada.edu	NV
Silver Lake College of the Holy Family	http://sl.edu	WI
Simmons College	http://simmons.edu	MA
Simpson College	http://simpson.edu	IA
Simpson University	http://simpsonu.edu	CA
Sinclair Community College	http://sinclair.edu	OH
Sinte Gleska University	http://sintegleska.edu	SC
Skagit Valley College	http://skagit.edu	WA
Skidmore College	http://skidmore.edu	NY
Skyline College	http://skylinecollege.edu	CA
Slippery Rock University	http://sru.edu	PA
Smith College	http://smith.edu	MA
Snead State Community College	http://snead.edu	AL
Snow College	http://snow.edu	UT
Sojourner-Douglass College	http://sdc.edu	MD
Soka University of America	http://soka.edu	CA
Solano Community College	http://solano.edu	CA
Sonoma State University	http://sonoma.edu	CA
South Carolina State University	http://scsu.edu	SC
South Central Career Center	http://scccwp.edu	MO
South Central College	http://southcentral.edu	MN
South Dakota School of Mines and Technology	http://sdsmt.edu	SD
South Dakota State University	http://sdstate.edu	SD
South Florida State College	http://southflorida.edu	FL
South Mountain Community College	http://southmountaincc.edu	AZ
South Piedmont Community College	http://spcc.edu	NC
South Plains College	http://southplainscollege.edu	TX
South Seattle College	http://southseattle.edu	WA
South Suburban College	http://ssc.edu	IL
South Texas College	http://southtexascollege.htp	TX
South Texas College of Law	http://stcl.edu	TX
Southeast Arkansas College	http://seark.edu	AR
Southeast Missouri State University	http://semo.edu	MO
Southeastern Baptist Theological Seminary	http://sebts.edu	NC
Southeastern Bible College	http://sebc.edu	AL
Southeastern Community College	http://sccnc.edu	NC
Southeastern Illinois College	http://sic.edu	IL
Southeastern Louisiana University	http://southeastern.edu	LA
Southeastern Oklahoma State University	http://se.edu	OK
Southeastern Technical College	http://southeasterntech.edu	GA
Southern Adventist University	http://southern.edu	TN
Southern Arkansas University Magnolia	http://saumag.edu	AR
Southern California University of Health Sciences	http://scuhs.edu	CA
Southern College of Optometry	http://sco.edu	TN
Southern Connecticut State University	http://southernct.edu	CT
Southern Illinois University	http://siu.edu	IL
Southern Illinois University Edwardsville	http://siue.edu	IL
Southern Maine Community College	http://smccme.edu	ME
Southern Methodist University	http://smu.edu	TX
Southern New Hampshire University	http://snhu.edu	NH
Southern Oregon University	http://sou.edu	OR
Southern Polytechnic State University	http://spsu.edu	GA
Southern University	http://subr.edu	LA
Southern Utah University	http://suu.edu	UT
Southern Virgina University	http://svu.edu	VA
Southwest Baptist University	http://sbuniv.edu	MO
Southwest Minnesota State University	http://smsu.edu	MN
Southwest Tennessee Community College	http://tn.edu	TN
Southwest Virgina Community College	http://sw.edu	VA
Southwestern Christian University	http://swcu.edu	OK
Southwestern College	http://swc.edu	NM
Southwestern College	http://swcc.edu	CA
Southwestern Community College	http://southwesterncc.edu	NC
Southwestern Community College	http://swcciowa.edu	IA
Southwestern Illinois College	http://swic.edu	IL
Southwestern Oklahoma State Univeristy	http://swosu.edu	OK
Southwestern Oregon Community  College	http://socc.edu	OR
Southwestern University	http://southwestern.edu	TX
Spa Tech Institute	http://spatech.edu	MA
Space Coast Health Institute	http://spacecoast.edu	FL
Spartanburg Methodist College	http://smcsc.edu	SC
Spelman College	http://spelman.edu	GA
Spokane Falls Community College	http://spokanefalls.edu	WA
Spoon River College	http://src.edu	IL
Springfield College	http://springfieldcollege.edu	MA
Springfield Technical Community College	http://stcc.edu	MA
Stanford University	http://stanford.edu	CA
Stanly Community College	http://stanly.edu	NC
Starr King School for the Ministry	http://sksm.edu	CA
State College of Florida	http://scf.edu	FL
State University of New Institute of Technology	http://sunyit.edu	NY
State University of New York	http://suny.edu	NY
State University of New York at Adirondack	http://sunyacc.edu	NY
State University of New York at Oneonta	http://oneonta.edu	NY
State University of New York at Oswego	http://oswego.edu	NY
State University of New York at Plattsburgh	http://plattsburgh.edu	NY
State University of New York at Potsdam	http://potsdam.edu	NY
Stenotech Career Institute	http://stenotech.edu	NJ
Stephen F. Austin State University	http://sfasu.edu	TX
Sterling College	http://sterling.edu	KS
Stetson University	http://stetson.edu	FL
Stevens Institute of Technology	http://stevens.edu	NJ
Stockton College	http://stockton.edu	NJ
Stony Brook Medicine	http://stonybrookmedicine.edu	NY
Stony Brook University	http://stonybrook.edu	NY
Stratford University	http://stratford.edu	VA
Suffolk County Community College	http://sunysuffolk.edu	NY
Suffolk University	http://suffolk.edu	MA
Sullivan University	http://sullivan.edu	KY
Susquehanna University	http://susqu.edu	PA
Sussex County Community College	http://sussex.edu	NJ
Swarthmore College	http://swarthmor.edu	PA
Syracuse University	http://syr.edu	NY
Taft College	http://taftcollege.edu	CA
Tarleton State University	http://tarleton.edu	TX
Temple College	http://templejc.edu	TX
Temple University	http://temple.edu	PA
Tennessee State University	http://tnstate.edu	TN
Tennessee Technological University	http://tntech.edu	TN
Tennessee Wesleyan College	http://twcnet.edu	TN
Texas A&M Health Science Center	http://tamhsc.edu	TX
Texas A&M International University	http://tamiu.edu	TX
Texas A&M University	http://tamu.edu	TX
Texas A&M University Commerce	http://tamuc.edu	TX
Texas A&M University Corpus Christi	http://tamucc.edu	TX
Texas A&M University Kingsville	http://tamuk.edu	TX
Texas A&M University Texarkana	http://tamut.edu	TX
Texas Chiropractic College	http://txchiro.edu	TX
Texas Christian University	http://tcu.edu	TX
Texas Southern University	http://tsu.edu	TX
Texas State Technical College	http://tstc.edu	TX
Texas State University	http://txstate.edu	TX
Texas Tech University	http://ttu.edu	TX
Texas Tech University Health Sciences Center	http://ttuhsc.edu	TX
Texas Woman’s University	http://twu.edu	TX
The  American College of Financial Services	http://theamericancollege.edu	PA
The American Musical and Dramatic Academy	http://amda.edu	NY
The Art Institute	http://artinstitutes.edu	CA
The Boston Conservatory	http://bostonconservatory.edu	MA
The Catholic University of America	http://cua.edu	DC
The Citadel Military College of South Carolina	http://citadel.edu	SC
The City University of New York	http://cuny.edu	NY
The Claremont Colleges	http://claremont.edu	CA
The College at Brockport	http://brockport.edu	NY
The College of Idaho	http://collegeofidaho.edu	ID
The College of New Jersey	http://tcnj.edu	NJ
The College of New Rochelle	http://cnr.edu	NY
The College of Saint Rose	http://strose.edu	NY
The College of Saint Scholastica	http://css.edu	MN
The College of Westchester	http://cw.edu	NY
The College of William and Mary	http://wm.edu	VA
The College of Wooster	http://wooster.edu	OH
The Community College of Baltimore County	http://ccbcmd.edu	MD
The Cooper Union	http://cooper.edu	NY
The Evergreen State College	http://evergreen.edu	WA
The General Theological Seminary	http://gts.edu	NY
The George Washington University	http://gwu.edu	DC
The Hadley School for the Blind	http://hadley.edu	IL
The Institute for the Psychological Sciences	http://ipsciences.edu	VA
The Institute of Beauty and Wellness	http://ibw.edu	WI
The Institute of Buddhist Studies	http://shin-ibs.edu	CA
The Jewish Theological Seminary	http://jtsa.edu	NY
The John Marshall Law School	http://jmls.edu	IL
The Juilliard School	http://juilliard.edu	NY
The LeMoyne-Owen College	http://loc.edu	TN
The Lincoln University	http://lincoln.edu	PA
The Master’s College	http://masters.edu	CA
The New School	http://newschool.edu	NY
The New York Conservatory for Dramatic Arts	http://sft.edu	NY
The Sages Colleges	http://sage.edu	NY
The Southern Baptist Theological Seminary	http://sbts.edu	KY
The Touro College and University System	http://touro.edu	NY
The University of Akron	http://uakron.edu	OH
The University of Chicago Booth School of Business	http://chicagobooth.edu	IL
The University of Findlay	http://findlay.edu	OH
The University of Kansas	http://ku.edu	KS
The University of Louisville	http://louisville.edu	KY
The University of Memphis	http://memphis.edu	TN
The University of Mississippi	http://olemiss.edu	MS
The University of Mount Olive	http://umo.edu	NC
The University of Oklahoma	http://ou.edu	OK
The University of Oklahoma Health Sciences Center	http://ouhsc.edu	OK
The University of Rhode Island	http://uri.edu	RI
The University of Scranton	http://scranton.edu	PA
The University of Tennessee	http://tennessee.edu	TN
Thiel College	http://thiel.edu	PA
Thomas Edison State College	http://tesc.edu	NJ
Thomas Jefferson University	http://jefferson.edu	PA
Thomas Nelson Community College	http://tncc.edu	VA
Thomas University	http://thomasu.edu	GA
Three Rivers Community College	http://threerivers.edu	CT
Tidewater Community College	http://tcc.edu	VA
Tiffin University	http://tiffin.edu	OH
Tompkins Cortland Community College	http://tc3.edu	NY
Touro College Jacob D. Fuchsberg Law Center	http://tourolaw.edu	NY
Touro University California	http://tu.edu	CA
Towson University	http://towson.edu	MD
Traviss Career Center	http://traviss.edu	FL
Trenholm State Technical College	http://trenholmstate.edu	AL
TriCounty Technical College	http://tctc.edu	SC
Trine University	http://trine.edu	IN
Trinity Christian College	http://trnty.edu	IL
Trinity College	http://trincoll.edu	CT
Trinity University	http://trinity.edu	TX
Troy University	http://troy.edu	AL
Truckee Meadows Community College	http://tmcc.edu	NV
Truman State University	http://truman.edu	MO
Tufts University	http://tufts.edu	MA
Tulane University	http://tulane.edu	LA
Tulsa Community College	http://tulsacc.edu	OK
Tunxis Community College	http://tunxis.edu	CT
Turtle Mountain Community College	http://tm.edu	ND
Tuskegee University	http://tuskegee.edu	AL
Tyler Junior College	http://tjc.edu	TX
UCLA School of Law	http://ucla.edu	CA
Union College	http://ucollege.edu	NE
Union College	http://union.edu	NY
Union University	http://uu.edu	TN
United States Military Academy West Point	http://usma.edu	NY
United States Naval Academy	http://usna.edu	MD
United Theological Seminary of the Twin Cities	http://unitedseminary.edu	MN
United Tribes Technical College	http://utcc.edu	ND
Unitek College	http://unitekcollege.edu	CA
Unity College	http://unity.edu	ME
Univeristy of Iowa	http://uiowa.edu	IA
Univeristy of New Mexico	http://unm.edu	NM
University Corporation for Atmospheric Research	http://ucar.edu	CO
University System of Georgia	http://usg.edu	GA
University System of Maryland	http://usmd.edu	MD
University at Albany	http://albany.edu	NY
University at Buffalo	http://buffalo.edu	NY
University of  Baltimore	http://ubalt.edu	MD
University of  Maryland Baltimore County	http://umbc.edu	MD
University of Advancing Technology	http://uat.edu	AZ
University of Alabama	http://ua.edu	AL
University of Alabama at Birmingham	http://uab.edu	AL
University of Alabama in Huntsville	http://uah.edu	AL
University of Alaska	http://alaska.edu	AK
University of Alaska Fairbanks	http://uaf.edu	AK
University of Arizona	http://arizona.edu	AZ
University of Arkansas	http://uark.edu	AR
University of Arkansas Community College Batesville	http://uaccb.edu	AR
University of Arkansas at Little Rock	http://ualr.edu	AR
University of Arkansas at Pine Bluff	http://uapb.edu	AR
University of Arkansas for Medical Sciences	http://uams.edu	AR
University of Arkansas – Fort Smith	http://uafs.edu	AK
University of California	http://ucop.edu	CA
University of California	http://universityofcalifornia.edu	CA
University of California Davis	http://ucdavis.edu	CA
University of California Hastings College of the Law	http://uchastings.edu	CA
University of California Irvine	http://uci.edu	CA
University of California Los Angeles	http://ucla.edu	CA
University of California Los Angeles Extension	http://uclaextension.edu	CA
University of California Merced	http://ucmerced.edu	CA
University of California Press	http://ucpress.edu	CA
University of California Riverside	http://ucr.edu	CA
University of California San Diego	http://ucsd.edu	CA
University of California San Francisco	http://ucsf.edu	CA
University of California Santa Barbara	http://ucsb.edu	CA
University of California Santa Cruz	http://ucsc.edu	CA
University of California Santa Cruz Silicon Valley Extension	http://ucsc-extension.edu	CA
University of California Washington Center	http://ucdc.edu	DC
University of Central Arkansas	http://uca.edu	AR
University of Central Florida	http://ucf.edu	FL
University of Central Missouri	http://ucmo.edu	MO
University of Central Oklahoma	http://uco.edu	OK
University of Charleston	http://ucwv.edu	WV
University of Chicago	http://uchicago.edu	IL
University of Cincinnati	http://uc.edu	OH
University of Cincinnati Blue Ash	http://ucblueash.edu	OH
University of Cincinnati Clermont	http://ucclermont.edu	OH
University of Colorado	http://cu.edu	CO
University of Colorado Boulder	http://colorado.edu	CO
University of Colorado Colorado Springs	http://uccs.edu	CO
University of Colorado Denver	http://ucdenver.edu	CO
University of Connecticut	http://uconn.edu	CT
University of Connecticut Health Center	http://uchc.edu	CT
University of Dallas	http://udallas.edu	TX
University of Dayton	http://udayton.edu	OH
University of Delaware	http://udel.edu	DE
University of Denver	http://du.edu	CO
University of Detroit Mercy	http://udmercy.edu	MI
University of Evansville	http://evansville.edu	IN
University of Florida	http://ufl.edu	FL
University of Georgia	http://uga.edu	GA
University of Hartford	http://hartford.edu	CT
University of Hawaii at Manoa	http://hawaii.edu	HI
University of Houston Clear Lake	http://uhcl.edu	TX
University of Houston Downtown	http://uhd.edu	TX
University of Idaho	http://uidaho.edu	ID
University of Illinois	http://uillinois.edu	IL
University of Illinois Springfield	http://uis.edu	IL
University of Illinois at Chicago	http://uic.edu	IL
University of Illinois at Urbana-Champaign	http://illinois.edu	IL
University of Indianapolis	http://uindy.edu	IN
University of La Verne	http://laverne.edu	CA
University of Louisiana Lafayette	http://louisiana.edu	LA
University of Louisiana at Monroe	http://ulm.edu	LA
University of Main at Augusta	http://uma.edu	ME
University of Maine	http://umaine.edu	ME
University of Maine Fort Kent	http://umfk.edu	ME
University of Maine at Presque Isle	http://umpi.edu	ME
University of Mary Hardin-Baylor	http://umhb.edu	TX
University of Mary Washington	http://umw.edu	VA
University of Maryland	http://umaryland.edu	MD
University of Maryland	http://umd.edu	MD
University of Maryland University College	http://umuc.edu	MD
University of Massachusetts	http://umassp.edu	MA
University of Massachusetts Amherst	http://umass.edu	MA
University of Massachusetts Boston	http://umb.edu	MA
University of Massachusetts Dartmouth	http://umassd.edu	MA
University of Massachusetts Lowell	http://uml.edu	MA
University of Massachusetts Medical School	http://umassmed.edu	MA
University of Miami	http://miami.edu	FL
University of Michigan	http://umich.edu	MI
University of Michigan-Flint	http://umflint.edu	MI
University of Minnesota	http://umn.edu	MN
University of Mississippi Medical Center	http://umc.edu	MS
University of Missouri Kansas City	http://umkc.edu	MO
University of Missouri Saint Louis	http://umsl.edu	MO
University of Missouri System	http://umsystem.edu	MO
University of Montana	http://umt.edu	MT
University of Montana Helena College	http://umhelena.edu	MT
University of Montana Western	http://umwestern.edu	MT
University of Montevallo	http://montevallo.edu	AL
University of Mount Union	http://mountunion.edu	OH
University of Nebraska	http://nebraska.edu	NE
University of Nebraska Medical Center	http://unmc.edu	NE
University of Nebraska Omaha	http://unomaha.edu	NE
University of Nebraska at Kearney	http://unk.edu	NE
University of Nebraska at Lincoln	http://unl.edu	NE
University of Nevada Las Vegas	http://unlv.edu	NV
University of Nevada Reno	http://unr.edu	NV
University of New England	http://une.edu	ME
University of New Hampshire	http://unh.edu	NH
University of New Haven	http://newhaven.edu	CT
University of New Orleans	http://uno.edu	LA
University of North Alabama	http://una.edu	AL
University of North Carolina	http://northcarolina.edu	NC
University of North Carolina Asheville	http://unca.edu	NC
University of North Carolina Charlotte	http://uncc.edu	NC
University of North Carolina Greensboro	http://uncg.edu	NC
University of North Carolina Pembroke	http://uncp.edu	NC
University of North Carolina School of the Arts	http://uncsa.edu	NC
University of North Carolina Wilmington	http://uncw.edu	NC
University of North Carolina at Chapel Hill	http://unc.edu	NC
University of North Dakota	http://und.edu	ND
University of North Florida	http://unf.edu	FL
University of North Georgia	http://ung.edu	GA
University of North Texas	http://unt.edu	TX
University of North Texas Health Science Center	http://unthsc.edu	TX
University of Northern Colorado	http://unco.edu	CO
University of Northern Iowa	http://uni.edu	IA
University of Northwestern Saint Paul	http://unwsp.edu	MN
University of Notre Dame	http://nd.edu	IN
University of Oregon	http://uoregon.edu	OR
University of Pennsylvania	http://upenn.edu	PA
University of Phoenix	http://phoenix.edu	AZ
University of Pittsburgh	http://pitt.edu	PA
University of Portland	http://up.edu	OR
University of Puget Sound	http://pugetsound.edu	WA
University of Redlands	http://redlands.edu	CA
University of Rhode Island	http://uri.edu	RI
University of Richmond	http://richmond.edu	VA
University of Rio  Grande	http://rio.edu	OH
University of Rochester	http://rochester.edu	NY
University of Saint Francis	http://stfrancis.edu	IL
University of Saint Joseph Connecticut	http://usj.edu	CT
University of Saint Mary	http://stmary.edu	KS
University of Saint Thomas	http://stthom.edu	TX
University of Saint Thomas	http://stthomas.edu	MN
University of San Diego	http://sandiego.edu	CA
University of San Francisco	http://usfca.edu	CA
University of Science and Arts of Oklahoma	http://usao.edu	OK
University of Sioux Falls	http://usioxfalls.edu	SD
University of South Alabama	http://southalabama.edu	AL
University of South Carolina	http://sc.edu	SC
University of South Carolina Aiken	http://usca.edu	SC
University of South Carolina Beaufort	http://uscb.edu	SC
University of South Carolina Upstate	http://uscupstate.edu	SC
University of South Dakota	http://usd.edu	SD
University of South Florida	http://usf.edu	FL
University of South Florida Saint Petersburg	http://usfsp.edu	FL
University of South Florida Sarasota-Manatee	http://usfsm.edu	FL
University of Southern California	http://usc.edu	CA
University of Southern Indiana	http://usi.edu	IN
University of Southern Mississippi	http://usm.edu	MS
University of Tampa	http://ut.edu	FL
University of Tennessee Chattanooga	http://utc.edu	TN
University of Tennessee Health Science Center	http://uthsc.edu	TN
University of Tennessee Knoxville	http://utk.edu	TN
University of Tennessee Martin	http://utm.edu	TN
University of Tennessee Space Institute	http://utsi.edu	TN
University of Texas Arlington	http://uta.edu	TX
University of Texas Brownsville	http://utb.edu	TX
University of Texas Dallas	http://utdallas.edu	TX
University of Texas Health Science Center Houston	http://uth.edu	TX
University of Texas Health Science Center San Antonio	http://uthscsa.edu	TX
University of Texas Medical Branch at Galveston	http://utmb.edu	TX
University of Texas Pan American	http://utpa.edu	TX
University of Texas Southwestern Medical Center	http://utsouthwestern.edu	TX
University of Texas at Austin	http://utexas.edu	TX
University of Texas at El Paso	http://utep.edu	TX
University of Texas at San Antonio	http://utsa.edu	TX
University of Texas at Tyler	http://online.uttyler.edu/	TX
University of Texas of the Permian Basin	http://utpb.edu	TX
University of Toledo	http://utoledo.edu	OH
University of Tulsa	http://utulsa.edu	OK
University of Utah	http://utah.edu	UT
University of Vermont	http://uvm.edu	VT
University of Virginia	http://virginia.edu	VA
University of Virginia’s College at Wise	http://uvawise.edu	VA
University of Washington	http://washington.edu	WA
University of Washington Bothell	http://uwb.edu	WA
University of Washington Tacoma	http://tacoma.uw.edu	WA
University of West Florida	http://uwf.edu	FL
University of West Georgia	http://westga.edu	GA
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
University of Wisconsin, Madison	http://wisc.edu	WI
University of Wyoming	http://uwyo.edu	WY
University of the Arts	http://uarts.edu	PA
University of the Cumberlands	http://ucumberlands.edu	KY
University of the District of Columbia	http://udc.edu	DC
University of the Incarnate Word	http://uiw.edu	TX
University of the Ozarks	http://ozarks.edu	AR
University of the Pacific	http://pacific.edu	CA
University of the Pacific	http://uop.edu	CA
University of the Rockies	http://rockies.edu	CO
University of the Sciences in Philadelphia	http://usciences.edu	PA
University of the Southwest	http://usw.edu	NM
University of the Virgin Islands	http://uvi.edu	USVI
Universty of Houston	http://uh.edu	TX
Upper Iowa University	http://uiu.edu	IA
Upstate  Medical University	http://upstate.edu	NY
Urbana University	http://urbana.edu	OH
Ursinus College	http://ursinus.edu	PA
Ursuline College	http://ursuline.edu	OH
Utah State University	http://usu.edu	UT
Utah Valley University	http://uvu.edu	UT
Utica College	http://utica.edu	NY
Valdosta State University	http://valdosta.edu	GA
Valencia College	http://valenciacollege.edu	FL
Valley City State University	http://vcsu.edu	ND
Valley Forge Christian College	http://vfcc.edu	PA
Valley Grande Institute	http://vgi.edu	TX
Valparaiso University	http://valpo.edu	IN
Vance-Granville Community College	http://vgcc.edu	NC
Vanderbilt University	http://vanderbilt.edu	TN
Vanguard University	http://vanguard.edu	CA
Vassar College	http://vassar.edu	NY
Ventura College	http://venturacollege.edu	CA
Vermont Law School	http://vermontlaw.edu	VT
Vermont Technical College	http://vtc.edu	VT
Victor Valley College	http://vvc.edu	CA
Victoria College	http://victoriacollege.edu	TX
Villanova University	http://villanova.edu	PA
Virgina Highlands Community College	http://vhcc.edu	VA
Virginia Commonwealth University	http://vcu.edu	VA
Virginia Institute of Marine Science	http://vims.edu	VA
Virginia International University	http://viu.edu	VA
Virginia Polytechnic Institute and State University	http://vt.edu	VA
Virginia State University	http://vsu.edu	VA
Virginia Union University	http://vuu.edu	VA
Virginia Wesleyan College	http://vwc.edu	VA
Virginia Western Community College	http://virginiawestern.edu	VA
Virginia’s Community Colleges	http://vccs.edu	VA
Viterbo University	http://viterbo.edu	WI
Volunteer State Community College	http://volstate.edu	TN
Wabash College	http://wabash.edu	IN
Wagner College	http://wagner.edu	NY
Wake Forest University	http://wfu.edu	NC
Wake Technical Community College	http://waketech.edu	NC
Walden University	http://waldenu.edu	MN
Waldorf College	http://waldorf.edu	IA
Walla Walla Community College	http://wwcc.edu	WA
Walla Walla University	http://wallawalla.edu	WA
Walsh University	http://walsh.edu	OH
Warner Pacific College	http://warnerpacific.edu	OR
Warner University	http://warner.edu	FL
Warren Wilson College	http://warren-wilson.edu	NC
Wartburg College	http://wartburg.edu	IA
Washburn University	http://washburn.edu	KS
Washburn University School of Law	http://washburnlaw.edu	KS
Washington College	http://washcoll.edu	MD
Washington State University	http://wsu.edu	WA
Washington University in Saint Louis	http://wustl.edu	MO
Washington and Jefferson  College	http://washjeff.edu	PA
Washington and Lee University	http://wlu.edu	VA
Washtenaw Community College	http://wccnet.edu	MI
Waubonsee Community College	http://waubonsee.edu	IL
Waukesha County Technical College	http://wctc.edu	WI
Wayland Baptist University	http://wbu.edu	TX
Wayne State	http://wayne.edu	MI
Wayne State College	http://wsc.edu	NE
Weatherford College	http://wc.edu	TX
Webber International University	http://webber.edu	FL
Weber State University	http://weber.edu	UT
Webster University	http://webster.edu	MO
Wellesley College	http://wellesley.edu	MA
Wells College	http://wells.edu	NY
Wenatchee Valley College	http://wvc.edu	WA
Wesley College	http://wesley.edu	DE
Wesleyan University	http://wesleyan.edu	CT
West  Chester University	http://wcupa.edu	PA
West Coast Baptist College	http://wcbc.edu	CA
West Hills Community College District	http://whccd.edu	CA
West Liberty University	http://westliberty.edu	WV
West Los Angeles College	http://wlac.edu	CA
West Texas A&M University	http://wtamu.edu	TX
West Valley College	http://westvalley.edu	CA
West Virginia Northern Community College	http://wvncc.edu	WV
West Virginia State University	http://wvstateu.edu	WV
West Virginia University	http://wvu.edu	WV
West Virginia Wesleyan College	http://wvwc.edu	WV
Westchester Community College	http://sunywcc.edu	NY
Western Carolina University	http://wcu.edu	NC
Western Connecticut State University	http://wcsu.edu	CT
Western Dakota Technical Institute	http://wdt.edu	SD
Western Illinois University	http://wiu.edu	IL
Western Kentucky University	http://wku.edu	KY
Western Michigan University	http://wmich.edu	MI
Western Nevada College	http://wnc.edu	NV
Western New England University	http://wne.edu	MA
Western Oklahoma State College	http://wosc.edu	OK
Western Oregon University	http://wou.edu	OR
Western Piedmont Community College	http://wpcc.edu	NC
Western Reserve University	http://cwru.edu	OH
Western State Colorado University	http://western.edu	CO
Western Technical College	http://westerntc.edu	WI
Western University of Health Sciences	http://westernu.edu	CA
Western Washington University	http://wwu.edu	WA
Westminster College	http://westminster.edu	PA
Westminster College, Missouri	http://westminster-mo.edu	MO
Westmont College	http://westmont.edu	CA
Westmoreland County Community College	http://wccc.edu	PA
Wheaton College	http://wheaton.edu	IL
Wheaton College, Norton	http://wheatoncollege.edu	MA
Wheeling Jesuit University	http://wju.edu	WV
Wheelock College	http://wheelock.edu	MA
White Mountains Community College	http://wmcc.edu	NH
Whitman College	http://whitman.edu	WA
Whittier College	http://whittier.edu	CA
Whitworth University	http://whitworth.edu	WA
Wichita State University	http://wichita.edu	KS
Widener University	http://widener.edu	PA
Wilkes University	http://wilkes.edu	PA
Willamette University	http://willamette.edu	OR
William Carey University	http://wmcarey.edu	MS
William Howard Taft University	http://taft.edu	CO
William Jessup University	http://jessup.edu	CA
William Paterson University	http://wpunj.edu	NJ
Williams Baptist College	http://wbcoll.edu	AR
Williams College	http://williams.edu	MA
Williston State College	http://willistonstate.edu	ND
Wilmington College	http://wilmington.edu	OH
Wilmington University	http://wilmu.edu	DE
Wilson College	http://wilson.edu	PA
Winona State Unviversity	http://winona.edu	MN
Winston-Salem State University	http://wssu.edu	NC
Winthrop University	http://winthrop.edu	SC
Wiregrass Georgia Technical College	http://wiregrass.edu	GA
Wisconsin Indianhead Technical College	http://witc.edu	WI
Wisconsin Lutheran College	http://wlc.edu	WI
Wisconsin Technical College System	http://wtcsystem.edu	WI
Wittenberg University	http://wittenberg.edu	OH
Wofford College	http://wofford.edu	SC
Wor-Wic Community College	http://worwic.edu	MD
Worcester Polytechnic Institute	http://wpi.edu	MA
Worcester State University	http://worcester.edu	MA
Wright State University	http://wright.edu	OH
Xavier University	http://xavier.edu	OH
Xavier University of Louisiana	http://xula.edu	LA
Yakima Valley Community College	http://yvcc.edu	WA
Yale University	http://yale.edu	CT
Yavapai College	http://yc.edu	AZ
Yeshiva University	http://yu.edu	NY
York College of Pennsylvania	http://ycp.edu	PA
York County Community College	http://yccc.edu	ME
York Technical College	http://yorktech.edu	SC
Yosemite Community College District	http://yosemite.edu	CA
Youngstown State University	http://ysu.edu	OH
Yuba Community College District	http://yccd.edu	CA`;

interface School {
  /** Name of the college, e.g. `'American University'`. */
  name: string;
  /** State where the college is located, e.g. `'AL'`. */
  state: string;
  /** Website of the college e.g. `'http://yccd.edu'`. */
  website: string;
}

export const SCHOOLS: School[] = RAW_SCHOOLS.split('\n')
  .map((s) => s.split('\t'))
  .map(([name, website, state]) => ({ name, state, website }));
