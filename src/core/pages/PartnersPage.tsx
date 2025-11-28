import React from 'react';
import { Footer } from '../components/Footer';
import { ExternalLink } from 'lucide-react';

const partnersData = [
  { name: "Abel Law Firm", state: "Oklahoma", website: "https://www.abellawfirm.com" },
  { name: "Abrahamson Law Office", state: "Nebraska", website: "https://www.abrahamsonlaw.com" },
  { name: "Accident Recovery Team", state: "Kansas", website: "https://www.accidentrecoveryteam.com" },
  { name: "Adams Davis, P.C.", state: "Utah", website: "https://www.adamsdavis.com" },
  { name: "Auto Accident Team", state: "National", website: "https://www.autoaccidentteam.com" },
  { name: "Alaska Injury Law Group", state: "Alaska", website: "https://www.alaskainjurylawgroup.com" },
  { name: "Alcock & Associates P.C.", state: "Arizona", website: "https://www.alcocklaw.com" },
  { name: "Allen Law Firm", state: "South Carolina", website: "https://www.allenlawfirmllc.com" },
  { name: "Allen Stuart & Associates, P.A.", state: "Mississippi", website: "https://www.allenstuart.com" },
  { name: "Alphin Norris, PLLC", state: "North Carolina", website: "https://www.alphinnorris.com" },
  { name: "Andrew Ryan Attorney at Law LLC", state: "Georgia", website: "https://www.andrewryanlaw.com" },
  { name: "Andrews, Benko & Associates", state: "North Dakota", website: "https://www.andrewsbenkolaw.com" },
  { name: "Andrews, Tomisich & Miller, P.C.", state: "Montana", website: "https://www.atmpersonal.com" },
  { name: "Archer Law Firm", state: "Indiana", website: "https://www.archerinjurylaw.com" },
  { name: "Aron Law Firm, S.C.", state: "Wisconsin", website: "https://www.aronlawfirm.com" },
  { name: "Arruebarrena Law Firm", state: "Louisiana", website: "https://www.alffirm.com" },
  { name: "Averbukh Law Firm PLLC", state: "Kentucky", website: "https://www.averbukhlawfirm.com" },
  { name: "Bailey, Javins & Carter", state: "Alabama", website: "https://www.alabamainjurylawyersbc.com" },
  { name: "Baker Law Firm", state: "New Mexico", website: "https://www.bakerlawfirm.net" },
  { name: "Ballow, Dawson & Paul, LLP", state: "Wyoming", website: "https://www.ballowdawsonpaul.com" },
  { name: "Barney Injury Law", state: "Virginia", website: "https://www.barneyinjurylaw.com" },
  { name: "Barney Law Firm, PLLC", state: "West Virginia", website: "https://www.wvlawfirm.com" },
  { name: "Barzee Flores", state: "Idaho", website: "https://www.barzeeflores.com" },
  { name: "Baum Law Office, P.C.", state: "Oregon", website: "https://www.baumlawoffice.com" },
  { name: "Benson & Bingham", state: "Nevada", website: "https://www.bensonbingham.com" },
  { name: "Berry Law Firm", state: "Arkansas", website: "https://www.berryinjurylaw.com" },
  { name: "Biggam Fox & Skinner", state: "Vermont", website: "https://www.biggamfox.com" },
  { name: "Berman & Simmons", state: "Maine", website: "https://www.bermansimmons.com" },
  { name: "Bert, King, McCormick & Weitz", state: "Washington", website: "https://www.bkmwlaw.com" },
  { name: "Bernstein & Mello", state: "New Hampshire", website: "https://www.bernsteinandmello.com" },
  { name: "Bifferato Gentilotti, LLC", state: "Delaware", website: "https://www.bisinjurylaw.com" },
  { name: "Berkowitz Hanna", state: "Connecticut", website: "https://www.berkowitzhanna.com" },
  { name: "Beattie Law Firm", state: "Iowa", website: "https://www.beattielawfirm.com" },
  { name: "Bilodeau, Capalbo & Willis", state: "Rhode Island", website: "https://www.riinjurylawyer.com" },
  { name: "Bisset Law Firm", state: "Colorado", website: "https://www.bissetlaw.com" },
  { name: "Bickerton Law Group, LLLP", state: "Hawaii", website: "https://www.bickertonlaw.com" },
  { name: "Blizzard & Nabers", state: "Texas", website: "https://www.blizzardnabers.com" },
  { name: "Blick Law Firm", state: "Florida", website: "https://www.blicklawfirm.com" },
  { name: "Bisnar Chase Personal Injury Attorneys", state: "California", website: "https://www.bestattorney.com" },
  { name: "Block O'Toole & Murphy, LLP", state: "New York", website: "https://www.blockotoole.com" },
  { name: "Blau & Blau, LLP", state: "Pennsylvania", website: "https://www.blaulaw.com" },
  { name: "Blumenshine Law Group", state: "Illinois", website: "https://www.blg-legal.com" },
  { name: "Bolek, Besser, Glesius, LLC", state: "Ohio", website: "https://www.bolekbesserglesius.com" },
  { name: "Buckfire Law", state: "Michigan", website: "https://www.buckfirelaw.com" },
  { name: "Breakstone, White & Gluck, P.C.", state: "Massachusetts", website: "https://www.bwglaw.com" },
  { name: "Blume Forte", state: "New Jersey", website: "https://www.blume-forte.com" },
  { name: "Belsky Weinberg & Horowitz", state: "Maryland", website: "https://www.bwhlaw.net" },
  { name: "Briol & Associates, PLLC", state: "Minnesota", website: "https://www.briollaw.com" },
  { name: "Brown & Crandall", state: "Missouri", website: "https://www.getbrown.com" },
  { name: "Brooks Injury Law", state: "Tennessee", website: "https://www.brooksinjurylaw.com" },
  { name: "Byrd Law, PLLC", state: "North Carolina", website: "https://www.byrdlaw.com" },
  { name: "Butler Wooten & Peak LLP", state: "Georgia", website: "https://www.bwplaw.com" },
  { name: "Burnette Shutt & McDaniel, PA", state: "South Carolina", website: "https://www.burnetteshutt.com" },
  { name: "Butler Law Firm", state: "Mississippi", website: "https://www.butlerinjurylaw.com" },
  { name: "Beasley, Allen, Crow, Methvin, Portis & Miles, P.C.", state: "Alabama", website: "https://www.beasleyallen.com" },
  { name: "Becker Law Office", state: "Kentucky", website: "https://www.beckerlawoffice.com" },
  { name: "Burke, Schultz, Harman & Jenkinson", state: "West Virginia", website: "https://www.bshjlaw.com" },
  { name: "Breit Biniazan", state: "Virginia", website: "https://www.breitcantor.com" },
  { name: "Boise Accident Lawyers", state: "Idaho", website: "https://www.boiseaccidentlawyers.com" },
  { name: "Bruner Law Firm", state: "Montana", website: "https://www.montanaaccidentlawyersbrunerlawfirm.com" },
  { name: "Brown, Drew & Massey, LLP", state: "Wyoming", website: "https://www.wyomingtriallaw.com" },
  { name: "Cavanaugh Law Firm, P.C.", state: "Oregon", website: "https://www.cavanaughlawfirm.com" },
  { name: "Car Accident Lawyers in Las Vegas", state: "Nevada", website: "https://www.caraccidentlawyersinlasvegas.com" },
  { name: "Caddell Reynolds Law Firm", state: "Arkansas", website: "https://www.caddelllaw.net" },
  { name: "Candon Schafer & Angulski, PLLC", state: "Vermont", website: "https://www.csavtlawyers.com" },
  { name: "Clifford & Clifford", state: "Maine", website: "https://www.cliffordlegal.com" },
  { name: "Carlisle Law Group", state: "Washington", website: "https://www.carlislelawgroup.com" },
  { name: "Cohen & Winters, PLLC", state: "New Hampshire", website: "https://www.cohenandwinters.com" },
  { name: "Calhoun, Calhoun & Pliego, LLC", state: "Delaware", website: "https://www.ccplawfirm.com" },
  { name: "Carter Mario Injury Lawyers", state: "Connecticut", website: "https://www.cartermario.com" },
  { name: "Caputo & Mariotti Law Offices", state: "Iowa", website: "https://www.caputolaw.com" },
  { name: "Casey, Peterson & Associates", state: "South Dakota", website: "https://www.caseypeterson.com" },
  { name: "D'Oliveira & Associates", state: "Rhode Island", website: "https://www.dolaw.com" },
  { name: "Carabin Shaw", state: "Colorado", website: "https://www.carabinshaw.com" },
  { name: "Cronin, Fried, Sekiya, Kekina & Fairbanks Attorneys at Law", state: "Hawaii", website: "https://www.croninhawaii.com" },
  { name: "Car Accident Lawyers Firm", state: "Texas", website: "https://www.caraccidentlawyersfirm.com" },
  { name: "Coye Law Firm", state: "Florida", website: "https://www.coyelaw.com" },
  { name: "Carpenter, Zuckerman & Rowley, LLP", state: "California", website: "https://www.czrlaw.com" },
  { name: "Cellino Law", state: "New York", website: "https://www.cellinolaw.com" },
  { name: "Coccia Law", state: "Pennsylvania", website: "https://www.coccialaw.com" },
  { name: "Coplan & Crane", state: "Illinois", website: "https://www.coplanandcrane.com" },
  { name: "Chester Law Group Co., LPA", state: "Ohio", website: "https://www.chesterlawgroup.com" },
  { name: "Clark, Campbell, Lancaster & Munson, P.A.", state: "Michigan", website: "https://www.cclmlaw.com" },
  { name: "Crowe & Mulvey, LLP", state: "Massachusetts", website: "https://www.crowelaw.com" },
  { name: "Cohen & Riechelson", state: "New Jersey", website: "https://www.crlaw.com" },
  { name: "Cariati Law", state: "Maryland", website: "https://www.cariatilaw.com" },
  { name: "Carey Law Office", state: "Minnesota", website: "https://www.careylawoffice.com" },
  { name: "Cullan & Cullan, LLC", state: "Missouri", website: "https://www.cullanlaw.com" },
  { name: "Clifford Law Office", state: "Tennessee", website: "https://www.cliffordlawoffice.com" },
  { name: "Camrud, Maddock, Olson & Larson, Ltd.", state: "North Dakota", website: "https://www.cmollaw.com" },
  { name: "Crossen & Crossen", state: "Indiana", website: "https://www.crossenlawfirm.com" },
  { name: "Cannon & Dunphy, S.C.", state: "Wisconsin", website: "https://www.cannon-dunphy.com" },
  { name: "Carr & Carr Attorneys at Law", state: "Kansas", website: "https://www.carrandcarr.com" },
  { name: "Christensen & Hymas", state: "Utah", website: "https://www.christensenhymas.com" },
  { name: "Cashion Gilmore, LLC", state: "Alaska", website: "https://www.cashiongilmore.com" },
  { name: "Curiel & Runion Car Accident and Personal Injury Lawyers", state: "Arizona", website: "https://www.crlegal.com" },
  { name: "Crowe Arnold & Majors, LLP", state: "Oklahoma", website: "https://www.crowelaw.com" },
  { name: "Curry Law Office", state: "Nebraska", website: "https://www.currylaw.net" },
  { name: "Davis Law Firm, P.C.", state: "New Mexico", website: "https://www.davislawnm.com" },
  { name: "Derrick Law Firm", state: "South Carolina", website: "https://www.derricklawfirm.com" },
  { name: "Derek L. Hall, P.C.", state: "Mississippi", website: "https://www.hallattorney.com" },
  { name: "DeMayo Law Offices", state: "North Carolina", website: "https://www.demayolaw.com" },
  { name: "Drew Eckl & Farnham, LLP", state: "Georgia", website: "https://www.deflaw.com" },
  { name: "Dudley DeBosier Injury Lawyers", state: "Louisiana", website: "https://www.dudleydebosier.com" },
  { name: "Dean Waite & Associates, LLC", state: "Alabama", website: "https://www.deanwaitelaw.com" },
  { name: "Denison Law", state: "Kentucky", website: "https://www.denisonlaw.com" },
  { name: "DiTrapano, Barrett & DiPiero, PLLC", state: "West Virginia", website: "https://www.dbdlawfirm.com" },
  { name: "Dulaney, Lauer & Thomas, LLP", state: "Virginia", website: "https://www.dltlaw.com" },
  { name: "Day Shell & Liljenquist, LLP", state: "Idaho", website: "https://www.dsllaw.com" },
  { name: "Dahlberg Law Group", state: "Montana", website: "https://www.montanainjurylawyers.net" },
  { name: "Davis, Cannon, Yenny & Short, P.C.", state: "Wyoming", website: "https://www.dcyslaw.com" },
  { name: "D'Amore Law Group", state: "Oregon", website: "https://www.damorelawgroup.com" },
  { name: "De Castroverde Law Group", state: "Nevada", website: "https://www.de-castroverde.com" },
  { name: "Davis Law Firm, P.A.", state: "Arkansas", website: "https://www.thedavisfirm.com" },
  { name: "Downs Rachlin Martin PLLC", state: "Vermont", website: "https://www.drm.com" },
  { name: "Daggett Shuler", state: "Maine", website: "https://www.daggettshuler.com" },
  { name: "Davis Law Group, P.S.", state: "Washington", website: "https://www.injurytriallawyer.com" },
  { name: "Dartmouth Hitchcock Medical Center", state: "New Hampshire", website: "https://www.dhmc.org" },
  { name: "Doroshow, Pasquale, Krawitz & Bhaya", state: "Delaware", website: "https://www.dpkblaw.com" },
  { name: "D'Amico & Pettinicchi, LLC", state: "Connecticut", website: "https://www.dplawct.com" },
  { name: "Dutton Law Office", state: "Iowa", website: "https://www.duttonlawoffice.com" },
  { name: "Deren Law Office", state: "South Dakota", website: "https://www.derenlaw.com" },
  { name: "Decof, Barry, Mega & Quinn, P.C.", state: "Rhode Island", website: "https://www.dbmqlaw.com" },
  { name: "D'Amico Law Offices, LLC", state: "Colorado", website: "https://www.damico-law.com" },
  { name: "Davis Levin Livingston", state: "Hawaii", website: "https://www.hawaiilawyer.com" },
  { name: "Dax F. Garza, P.C.", state: "Texas", website: "https://www.daxgarzalaw.com" },
  { name: "David F. Goldman Law", state: "Florida", website: "https://www.davidfgoldman.com" },
  { name: "Dordick Law Corporation", state: "California", website: "https://www.dordicklaw.com" },
  { name: "Davey & Brogan, LLP", state: "New York", website: "https://www.daveybrogan.com" },
  { name: "Donaghue & Labrum, LLP", state: "Pennsylvania", website: "https://www.dlinjurylaw.com" },
  { name: "Dowd Law Firm", state: "Illinois", website: "https://www.thedowdlawfirm.com" },
  { name: "Dworken & Bernstein Co., L.P.A.", state: "Ohio", website: "https://www.dworkenlaw.com" },
  { name: "Dehn Legal, PLLC", state: "Michigan", website: "https://www.dehnlegal.com" },
  { name: "Denn & Bernier, LLC", state: "Massachusetts", website: "https://www.dennlaw.com" },
  { name: "Davis, Saperstein & Salomon, P.C.", state: "New Jersey", website: "https://www.dsslaw.com" },
  { name: "DuBoff & Associates, Chartered", state: "Maryland", website: "https://www.dubofflaw.com" },
  { name: "Duffy Law Office", state: "Minnesota", website: "https://www.duffylawoffice.com" },
  { name: "Duea Law", state: "Missouri", website: "https://www.duealaw.com" },
  { name: "David E. Gordon, Attorney at Law", state: "Tennessee", website: "https://www.davidgordonlaw.com" },
  { name: "Dvorak Law Office", state: "North Dakota", website: "https://www.dvoraklawoffice.com" },
  { name: "Dean & Fulkerson", state: "Indiana", website: "https://www.dfadvocates.com" },
  { name: "Domnitz & Domnitz, S.C.", state: "Wisconsin", website: "https://www.d2law.com" },
  { name: "DiRisio Law Firm", state: "Kansas", website: "https://www.dirisiolaw.com" },
  { name: "Eisenberg", state: "Utah", website: "https://www.eisenberglaw.org" },
  { name: "Drew Law", state: "Alaska", website: "https://www.drewlawalaska.com" },
  { name: "Esquire Law", state: "Arizona", website: "https://www.esquirelawpc.com" },
  { name: "Edwards & Patterson Law", state: "Oklahoma", website: "https://www.edwardsandpatterson.com" },
  { name: "Edmunds Law, P.C., L.L.O.", state: "Nebraska", website: "https://www.edmundslaw.com" },
  { name: "Egolf + Ferlic + Martinez + Harwood, LLC", state: "New Mexico", website: "https://www.egolflaw.com" },
  { name: "Elrod Pope Law Firm", state: "South Carolina", website: "https://www.elrodpope.com" },
  { name: "Ellzey & Wester, PLLC", state: "Mississippi", website: "https://www.ewlawms.com" },
  { name: "Estes & Estes, P.A.", state: "North Carolina", website: "https://www.esteslaw.com" },
  { name: "Eustis Injury Law", state: "Georgia", website: "https://www.eustislaw.com" },
  { name: "Eric G. Johnson, P.L.C.", state: "Louisiana", website: "https://www.ericjohnsonlaw.com" },
  { name: "Eiland & McKinney, L.L.C.", state: "Alabama", website: "https://www.eminjurylaw.com" },
  { name: "Estep Law Firm", state: "Kentucky", website: "https://www.esteplawfirm.com" },
  { name: "Emroch & Kilduff, LLP", state: "West Virginia", website: "https://www.ekpersonalinjury.com" },
  { name: "Elk & Elk Co., Ltd.", state: "Virginia", website: "https://www.elkandelk.com" },
  { name: "Eberle, Berlin, Kading, Turnbow & McKlveen, Chtd.", state: "Idaho", website: "https://www.eberle.com" },
  { name: "Eagan Law Firm", state: "Montana", website: "https://www.eaganlawfirm.com" },
  { name: "Erickson & Associates, P.C.", state: "Wyoming", website: "https://www.ericksonandassociates.com" },
  { name: "Elk Law Firm", state: "Oregon", website: "https://www.elklawfirm.com" },
  { name: "Eglet Adams", state: "Nevada", website: "https://www.egletlaw.com" },
  { name: "Edie Yancey & Associates", state: "Arkansas", website: "https://www.edieyancey.com" },
  { name: "Ericson, Scalise & Mangan, P.C.", state: "Vermont", website: "https://www.esmvt.com" },
  { name: "Eatmon & Associates, PLLC", state: "Maine", website: "https://www.eatmonassociates.com" },
  { name: "Evergreen Personal Injury Counsel", state: "Washington", website: "https://www.injurycounsel.com" },
  { name: "Erler Grimes & Flood", state: "New Hampshire", website: "https://www.erlergrimes.com" },
  { name: "Elzufon Austin Reardon Tarlov & Mondell, P.A.", state: "Delaware", website: "https://www.elzufon.com" },
  { name: "Fitzpatrick Santos Sousa Perugini, P.C.", state: "Connecticut", website: "https://www.fssp.com" },
  { name: "Eells & Tronvold Law Offices, P.C.", state: "Iowa", website: "https://www.eellslaw.com" },
  { name: "Eklund Law Office, P.C.", state: "South Dakota", website: "https://www.eklundlawoffice.com" },
  { name: "Entwistle & Cappucci, LLP", state: "Rhode Island", website: "https://www.ecllp.com" },
  { name: "Franklin D. Azar & Associates, P.C.", state: "Colorado", website: "https://www.fdazar.com" },
  { name: "Farias & Farias Attorneys at Law", state: "Hawaii", website: "https://www.fariasandfarias.com" },
  { name: "FVF Law", state: "Texas", website: "https://www.fvf.com" },
  { name: "Farah & Farah, P.A.", state: "Florida", website: "https://www.farrahandfararah.com" },
  { name: "Farnaghi Law Firm", state: "California", website: "https://www.farnaghilaw.com" },
  { name: "Frekhtman & Associates", state: "New York", website: "https://www.frekhtman.com" },
  { name: "Fried Goldberg LLC", state: "Pennsylvania", website: "https://www.friedgoldberg.com" },
  { name: "Feinberg Sharma, P.C.", state: "Illinois", website: "https://www.feinbergsharma.com" },
  { name: "Friedman, Domiano & Smith", state: "Ohio", website: "https://www.fdslaw.com" },
  { name: "Fieger Law", state: "Michigan", website: "https://www.fiegerlaw.com" },
  { name: "Fernandez Law", state: "Massachusetts", website: "https://www.fernandezpersonalinjury.com" },
  { name: "Ferrara Law", state: "New Jersey", website: "https://www.ferraralawnj.com" },
  { name: "Felhaber, Larson, Fenlon & Vogt, P.A.", state: "Minnesota", website: "https://www.felhaber.com" },
  { name: "Finney Law Firm", state: "Missouri", website: "https://www.finneylawfirm.com" },
  { name: "Farrior & Farrior", state: "Tennessee", website: "https://www.farriorlaw.com" },
  { name: "Fleck Law Firm", state: "North Dakota", website: "https://www.flecklawfirm.com" },
  { name: "Fountain Law Firm, P.C.", state: "Indiana", website: "https://www.fountainlawfirm.com" },
  { name: "Fitzpatrick, Skemp & Associates, LLC", state: "Wisconsin", website: "https://www.fitz-skemp.com" },
  { name: "Findley Law Firm", state: "Kansas", website: "https://www.findleylaw.com" },
  { name: "Feller & Wendt, LLC", state: "Utah", website: "https://www.fellerwendt.com" },
  { name: "Finney Law Office", state: "Alaska", website: "https://www.finneylawalaska.com" },
  { name: "Fennemore Craig, P.C.", state: "Arizona", website: "https://www.fennlaw.com" },
  { name: "Foshee & Yaffe, P.C.", state: "Oklahoma", website: "https://www.fylaw.com" },
  { name: "Fiedler Law Firm", state: "Nebraska", website: "https://www.fiedlerlaw.com" },
  { name: "Freedman Boyd Hollander Goldberg Urias & Ward P.A.", state: "New Mexico", website: "https://www.fbdlaw.com" },
  { name: "Futeral & Nelson, LLC", state: "South Carolina", website: "https://www.futeralandnelson.com" },
  { name: "Farris, Riley & Pitt, LLP", state: "Mississippi", website: "https://www.frplaw.com" },
  { name: "Foy Law Firm", state: "North Carolina", website: "https://www.thefoylawfirm.com" },
  { name: "Gary Martin Hays & Associates", state: "Georgia", website: "https://www.garymartinhays.com" },
  { name: "Gordon McKernan Injury Attorneys", state: "Louisiana", website: "https://www.getgordon.com" },
  { name: "Guster Law Firm, LLC", state: "Alabama", website: "https://www.gusterlaw.com" },
  { name: "Garr Law Firm", state: "Kentucky", website: "https://www.garrlawfirm.com" },
  { name: "Gold, Khourey & Turak", state: "West Virginia", website: "https://www.gktlaw.com" },
  { name: "Garnick Law Firm", state: "Virginia", website: "https://www.garnicklaw.com" },
  { name: "Gwartney Tore Beal", state: "Idaho", website: "https://www.gtblaw.com" },
  { name: "Grafe Law Office", state: "Montana", website: "https://www.grafeminot.com" },
  { name: "Godfrey & Hoy, LLC", state: "Wyoming", website: "https://www.godfreyhoy.com" },
  { name: "Gilroy, Napoli, Short Law Group", state: "Oregon", website: "https://www.gnslawgroup.com" },
  { name: "Gina Corena & Associates", state: "Nevada", website: "https://www.ginacorena.com" },
  { name: "Griffin & Davis, PLLC", state: "Arkansas", website: "https://www.griffinandavis.com" },
  { name: "Garfield Law Group", state: "Vermont", website: "https://www.garfieldlawgroup.com" },
  { name: "Gogel Law Offices, PLLC", state: "Maine", website: "https://www.gogellaw.com" },
  { name: "Gould & Kilpatrick", state: "Washington", website: "https://www.gouldkilpatrick.com" },
  { name: "Giles Law, PLLC", state: "New Hampshire", website: "https://www.gileslaw.com" },
  { name: "Galloway & Associates, LLC", state: "Delaware", website: "https://www.gallowayinjury.com" },
  { name: "Gesmonde, Pietrosimone & Sgrignari, L.L.C.", state: "Connecticut", website: "https://www.gpslaw.com" },
  { name: "Goosmann Law Firm, PLC", state: "Iowa", website: "https://www.goosmannlaw.com" },
  { name: "Gunderson, Palmer, Nelson & Ashmore, LLP", state: "South Dakota", website: "https://www.gundersonpalmer.com" },
  { name: "Gemma Law Associates, Inc.", state: "Rhode Island", website: "https://www.gemmalaw.com" },
  { name: "Gerash Steiner Blanton, P.C.", state: "Colorado", website: "https://www.gerashlawyers.com" },
  { name: "Goeas Law Corporation", state: "Hawaii", website: "https://www.goeaslaw.com" },
  { name: "Grossman Law Offices", state: "Texas", website: "https://www.grossmanlaw.net" },
  { name: "Gomez Trial Attorneys", state: "California", website: "https://www.gomeztrial.com" },
  { name: "Gair, Gair, Conason, Rubinowitz, Bloom, Hershenhorn, Steigman & Mackauf", state: "New York", website: "https://www.gairlaw.com" },
  { name: "Galfand Berger LLP", state: "Pennsylvania", website: "https://www.galfandberger.com" },
  { name: "Goldberg Weisman Cairo", state: "Illinois", website: "https://www.gwclaw.com" },
  { name: "Gallon, Takacs & Boissoneault Co., LPA", state: "Ohio", website: "https://www.gtblaw.com" },
  { name: "Goodman Acker, P.C.", state: "Michigan", website: "https://www.goodmanacker.com" },
  { name: "Gilman Law, P.C.", state: "Massachusetts", website: "https://www.gilmanlawpc.com" },
  { name: "Garces, Grabler & LeBrocq, P.C.", state: "New Jersey", website: "https://www.gglinjurylaw.com" },
  { name: "Grossman & Associates", state: "Maryland", website: "https://www.grossmanattorneys.com" },
  { name: "Gordon & Gordon Law", state: "Minnesota", website: "https://www.gordonlawfirm.com" },
  { name: "Goldberg Law Firm", state: "Missouri", website: "https://www.goldberglawoffice.com" },
  { name: "Giddens Law Firm, P.A.", state: "Tennessee", website: "https://www.giddenslawfirm.com" },
  { name: "Gjesdahl Law, P.C.", state: "North Dakota", website: "https://www.gjesdahl.com" },
  { name: "Goodin Abernathy LLP", state: "Indiana", website: "https://www.goodinabernathy.com" },
  { name: "Gruber Law Offices, LLC", state: "Wisconsin", website: "https://www.gruber-law.com" },
  { name: "Goddard Law, PLC", state: "Kansas", website: "https://www.goddardlegal.com" },
  { name: "Gosdis Law", state: "Utah", website: "https://www.gosdislaw.com" },
  { name: "Gregory P. Groshong, LLC", state: "Alaska", website: "https://www.groshonglaw.com" },
  { name: "Gomez, Martinez, Parada & Associates, PLC", state: "Arizona", website: "https://www.gmplaw.com" },
  { name: "GableGotwals", state: "Oklahoma", website: "https://www.gablelaw.com" },
  { name: "Goosmann Law Firm", state: "Nebraska", website: "https://www.goosmannlaw.com" },
  { name: "Gonzales Law Firm, P.C.", state: "New Mexico", website: "https://www.gonz-law.com" },
  { name: "Grier, Furr & Crisp, P.A.", state: "South Carolina", website: "https://www.grierfurr.com" },
  { name: "Gamel Law Firm", state: "Mississippi", website: "https://www.gamellaw.com" },
  { name: "Hardison & Cochran", state: "North Carolina", website: "https://www.hardisonandcochran.com" },
  { name: "Henrickson & Sereebutra", state: "Georgia", website: "https://www.hsinjurylaw.com" },
  { name: "Hanna Law Firm", state: "Louisiana", website: "https://www.hannalawfirm.com" },
  { name: "Hollis, Wright, Clay & Vail, P.C.", state: "Alabama", website: "https://www.hwcv.com" },
  { name: "Hendy, Johnson & Vaughn, PLLC", state: "Kentucky", website: "https://www.hjvlaw.com" },
  { name: "Hendrickson & Long, PLLC", state: "West Virginia", website: "https://www.hendricksonlong.com" },
  { name: "Hale Injury Law", state: "Virginia", website: "https://www.haleinjurylaw.com" },
  { name: "Hepworth Holzer, LLP", state: "Idaho", website: "https://www.hepworthlaw.com" },
  { name: "Hoyt & Blewett, PLLC", state: "Montana", website: "https://www.hblegal.com" },
  { name: "Hirst Applegate", state: "Wyoming", website: "https://www.hirstapplegate.com" },
  { name: "Herron & Beeks", state: "Oregon", website: "https://www.herronlaw.com" },
  { name: "Harris & Harris Injury Lawyers", state: "Nevada", website: "https://www.hhlawlv.com" },
  { name: "Hernandez, McLemore & Martinez", state: "Arkansas", website: "https://www.hmmfirm.com" },
  { name: "Heyka Storrow & Cosgrove, PLLC", state: "Vermont", website: "https://www.heyka.com" },
  { name: "Hardy, Wolf & Downing", state: "Maine", website: "https://www.hwdlawyers.com" },
  { name: "Hardwick & Harkness, PLLC", state: "Washington", website: "https://www.h2injury.com" },
  { name: "Heinze & Scribner, PLLC", state: "New Hampshire", website: "https://www.hslawfirm.com" },
  { name: "Heckler & Frabizzio", state: "Delaware", website: "https://www.hecklerandfrabizzio.com" },
  { name: "Hassett & George, P.C.", state: "Connecticut", website: "https://www.hassettandgeorge.com" },
  { name: "Howes Law Firm, P.C.", state: "Iowa", website: "https://www.howeslawfirm.com" },
  { name: "Helsper, McCarty & Rasmussen, LLP", state: "South Dakota", website: "https://www.hmrlawyers.com" },
  { name: "Higgins, Cavanagh & Cooney, LLP", state: "Rhode Island", website: "https://www.hcc-law.com" },
  { name: "Holland, Hart, Stephenson & Mitchell, P.C.", state: "Colorado", website: "https://www.hhmlaw.com" },
  { name: "Hawk Sing Ignacio & Waters", state: "Hawaii", website: "https://www.hsiwlaw.com" },
  { name: "Herrman & Herrman, P.L.L.C.", state: "Texas", website: "https://www.herrmanandherrman.com" },
  { name: "Halberg & Fogg, PLLC", state: "Florida", website: "https://www.halbergfogg.com" },
  { name: "Heidari Law Group", state: "California", website: "https://www.heidarilaw.com" },
  { name: "Hach & Rose, LLP", state: "New York", website: "https://www.hrllp.com" },
  { name: "Handler, Henning & Rosenberg LLC", state: "Pennsylvania", website: "https://www.hhrlaw.com" },
  { name: "Hupy and Abraham, S.C.", state: "Illinois", website: "https://www.hupy.com" },
  { name: "Hastings & Hastings", state: "Ohio", website: "https://www.hastingslaw.com" },
  { name: "Hurley McKenna & Mertz, P.C.", state: "Michigan", website: "https://www.michiganlegalcenter.com" },
  { name: "Houlihan & Houlihan", state: "Massachusetts", website: "https://www.houlihanlegal.com" },
  { name: "Hochman & Hochman, LLC", state: "New Jersey", website: "https://www.hochmanandmitchell.com" },
  { name: "Hodes, Ulman, Pessin & Katz, P.A.", state: "Maryland", website: "https://www.hopklaw.com" },
  { name: "Hunegs, LeNeave & Kvas, P.A.", state: "Minnesota", website: "https://www.hlklaw.com" },
  { name: "Horn Law", state: "Missouri", website: "https://www.hornlawgroup.com" },
  { name: "Hodge & Scanlan", state: "Tennessee", website: "https://www.tennesseeinjurylawyers.com" },
  { name: "Hanson & Anderson, P.C.", state: "North Dakota", website: "https://www.hansonandersonlaw.com" },
  { name: "Hessler Law", state: "Indiana", website: "https://www.hesslerlegal.com" },
  { name: "Habush Habush & Rottier S.C.", state: "Wisconsin", website: "https://www.habush.com" },
  { name: "Hutton & Hutton Law Firm, LLC", state: "Kansas", website: "https://www.huttonlaw.com" },
  { name: "Howard, Lewis & Petersen, P.C.", state: "Utah", website: "https://www.howardlewis.com" },
  { name: "Hartig Rhodes Hoge & Griffith", state: "Alaska", website: "https://www.hartrhg.com" },
  { name: "Haralson, Miller, Pitt, Feldman & McAnally, P.L.C.", state: "Arizona", website: "https://www.hmpmlaw.com" },
  { name: "Hasbrook & Hasbrook", state: "Oklahoma", website: "https://www.hasbrook.com" },
  { name: "High & Younes, LLP", state: "Nebraska", website: "https://www.highyouneslaw.com" },
  { name: "Hinkle Shanor, LLP", state: "New Mexico", website: "https://www.hinklelawfirm.com" },
  { name: "Holler & Holler", state: "South Carolina", website: "https://www.hollerlaw.com" },
  { name: "Hodges & Freehill", state: "Mississippi", website: "https://www.hodgesandfreehill.com" },
  { name: "Hardee, Hardee & Hardee, P.A.", state: "North Carolina", website: "https://www.hardeelaw.com" },
  { name: "Inkelaar Law, PLLC", state: "Georgia", website: "https://www.inkelaarlaw.com" },
  { name: "Irpino, Avin & Hawkins Law Firm", state: "Louisiana", website: "https://www.iahlaw.com" },
  { name: "Informer Law", state: "Alabama", website: "https://www.informerlaw.com" },
  { name: "Isaac Law Office, PSC", state: "Kentucky", website: "https://www.isaaclawoffice.com" },
  { name: "Isaacs & Isaacs Personal Injury Lawyers", state: "West Virginia", website: "https://www.isaacsbeecher.com" },
  { name: "Injurylawyers.com", state: "Virginia", website: "https://www.injurylawyers.com" },
  { name: "Inbounds.com", state: "National", website: "https://www.inbounds.com" },
  { name: "Idaho Advocates", state: "Idaho", website: "https://www.idahoadvocates.com" },
  { name: "Ireland Stapleton Pryor & Pascoe, PC", state: "Montana", website: "https://www.injurylawyersmt.com" },
  { name: "Ironside Law Offices, LLC", state: "Wyoming", website: "https://www.ironsidelaw.com" },
  { name: "Iler & Iler, LLP", state: "Oregon", website: "https://www.ilerlaw.com" },
  { name: "Insurance Claim HQ", state: "Nevada", website: "https://www.insuranceclaimhq.com" },
  { name: "Iddins Law Firm, PA", state: "Arkansas", website: "https://www.iddinslawfirm.com" },
  { name: "Infante Zipp, P.C.", state: "Vermont", website: "https://www.izattorneys.com" },
  { name: "Isaacson & Raymond, P.A.", state: "Maine", website: "https://www.isaacsonraymond.com" },
  { name: "Ibershof & Associates, P.S.", state: "Washington", website: "https://www.iblaw.com" },
  { name: "Iannuzzi & Iannuzzi, PLLC", state: "New Hampshire", website: "https://www.iannuzzilawfirm.com" },
  { name: "Iler & Grubbs", state: "Delaware", website: "https://www.ilergrubbs.com" },
  { name: "Ianno, Manning & Diamond, LLC", state: "Connecticut", website: "https://www.imdlegal.com" },
  { name: "Irpino Law, P.C.", state: "Iowa", website: "https://www.irpinolaw.com" },
  { name: "Ireland Law Firm, Prof LLC", state: "South Dakota", website: "https://www.irelandlawfirm.com" },
  { name: "James L. Badgett, Attorney at Law", state: "Oklahoma", website: "https://www.badgettlaw.com" },
  { name: "Janousek & Janousek, Attorneys at Law", state: "Nebraska", website: "https://www.janouseklaw.com" },
  { name: "James Wood Law", state: "New Mexico", website: "https://www.jameswoodlaw.com" },
  { name: "Joye Law Firm", state: "South Carolina", website: "https://www.joyelawfirm.com" },
  { name: "Jones Law Firm, P.C.", state: "Mississippi", website: "https://www.jonesinjurylaw.net" },
  { name: "Jason E. Taylor, P.C.", state: "North Carolina", website: "https://www.jtlegal.com" },
  { name: "John B. Jackson & Associates", state: "Georgia", website: "https://www.jacksonlawga.com" },
  { name: "John H. Redmann Attorney at Law, LLC", state: "Louisiana", website: "https://www.redmannlaw.com" },
  { name: "Jinks, Crow & Dickson, P.C.", state: "Alabama", website: "https://www.jcdfirm.com" },
  { name: "Jury Law Firm", state: "Kentucky", website: "https://www.jurylawfirm.com" },
  { name: "Johnson, Janklow, Abdallah & Reiter, LLP", state: "West Virginia", website: "https://www.jjarlawfirm.com" },
  { name: "Jelinek, Schwartz & Connors, LLP", state: "Virginia", website: "https://www.jsclegal.com" },
  { name: "Johnson & Lundeen, Chtd.", state: "Idaho", website: "https://www.johnsonandlundeen.com" },
  { name: "Jones Law Firm, PLLC", state: "Montana", website: "https://www.joneslawfirmmt.com" },
  { name: "Jensen & Wochner, LLC", state: "Wyoming", website: "https://www.jensenandwochner.com" },
  { name: "Johnston Law Firm, P.C.", state: "Oregon", website: "https://www.johnstonlawfirm.com" },
  { name: "Jacoby & Meyers, LLP", state: "Nevada", website: "https://www.jacobyandmeyers.com" },
  { name: "Jim Everett, Attorney at Law", state: "Arkansas", website: "https://www.jimeverettlaw.com" },
  { name: "Jarvis, Gibbons & Buerkett, P.C.", state: "Vermont", website: "https://www.jgblawvt.com" },
  { name: "Joe Bornstein Law Offices", state: "Maine", website: "https://www.joebornstein.com" },
  { name: "Johnston Law Firm, P.S.", state: "Washington", website: "https://www.johnstoninjurylaw.com" },
  { name: "Jecusco Law Office, PLLC", state: "New Hampshire", website: "https://www.jecuscolaw.com" },
  { name: "Jacobs & Crumplar, P.A.", state: "Delaware", website: "https://www.jacobsandcrumplar.com" },
  { name: "Jonathan Perkins Injury Lawyers", state: "Connecticut", website: "https://www.injurylawct.com" },
  { name: "James H. Foley, P.C.", state: "Iowa", website: "https://www.foleyinjurylawyer.com" },
  { name: "Johnson, Miner, Marlow, Woodward & Huff, LLP", state: "South Dakota", website: "https://www.jmmwh.com" },
  { name: "Jarosh & Radziunas, P.C.", state: "Rhode Island", website: "https://www.jrlaw-ri.com" },
  { name: "Jorgensen, Brownell & Pepin, P.C.", state: "Colorado", website: "https://www.jbplaw.com" },
  { name: "John C. Perkin, Attorney at Law", state: "Hawaii", website: "https://www.johnperkin.com" },
  { name: "Jim Adler & Associates", state: "Texas", website: "https://www.jimadler.com" },
  { name: "Joseph, Houchins, Carter, PC", state: "Florida", website: "https://www.floridaadlawyers.com" },
  { name: "Jorgensen, Yates & Blatt, LLP", state: "California", website: "https://www.jyblawfirm.com" },
  { name: "Jerner & Palmer, P.C.", state: "Pennsylvania", website: "https://www.jernerpalmer.com" },
  { name: "Johnston Tomei Lenczycki & Goldberg LLC", state: "Illinois", website: "https://www.jtlglaw.com" },
  { name: "Joseph Law Firm Co., LPA", state: "Ohio", website: "https://www.josephlaw.com" },
  { name: "Joumana Kayrouz, PLLC", state: "Michigan", website: "https://www.1800calljoumana.com" },
  { name: "Jezic & Moyse, LLC", state: "Massachusetts", website: "https://www.jezicfirm.com" },
  { name: "Javerbaum Wurgaft Hicks Kahn Wikstrom & Sinins, P.C.", state: "New Jersey", website: "https://www.jwhslaw.com" },
  { name: "Janet, Janet & Suggs, LLC", state: "Maryland", website: "https://www.jjslawfirm.com" },
  { name: "Johnson/Turner Legal", state: "Minnesota", website: "https://www.johnsonturner.com" },
  { name: "Jones, Granger & Howell", state: "Missouri", website: "https://www.jghlaw.com" },
  { name: "J. Stratton Baggett, Attorney at Law, PLLC", state: "Tennessee", website: "https://www.jsblaw.com" },
  { name: "Johnson, Larson & Galstad", state: "North Dakota", website: "https://www.jlglawfirm.com" },
  { name: "Jweinat Law Group, P.C", state: "National", website: "https://www.jweinatlawgroup.com" },
  { name: "Jeffrey J. Dible", state: "Indiana", website: "https://www.diblelawoffice.com" },
  { name: "Johnson & Bell, Ltd.", state: "Wisconsin", website: "https://www.johnsonandbell.com" },
  { name: "Jamal Law", state: "Kansas", website: "https://www.jamallawgroup.com" },
  { name: "Jensen Law", state: "Utah", website: "https://www.jensenandassociates.net" },
  { name: "Jahns Law Firm", state: "Alaska", website: "https://www.jahnslawfirm.com" },
  { name: "Jillson Law", state: "Arizona", website: "https://www.jillsonlaw.com" },
  { name: "Kania Law Office", state: "Oklahoma", website: "https://www.kaniapersonalinjury.com" },
  { name: "Knowles Law Firm", state: "Nebraska", website: "https://www.knowles-law.com" },
  { name: "Keller & Keller", state: "New Mexico", website: "https://www.2keller.com" },
  { name: "Kimbell Law Firm", state: "South Carolina", website: "https://www.kimbelllaw.com" },
  { name: "Kitchens Law Firm", state: "Mississippi", website: "https://www.kitchenslawfirm.com" },
  { name: "Kellum Law Firm", state: "North Carolina", website: "https://www.kellumlawfirm.com" },
  { name: "Kaufman Law, P.C.", state: "Georgia", website: "https://www.kaufmanlaw.com" },
  { name: "Kiefer & Kiefer", state: "Louisiana", website: "https://www.kieferandkiefer.com" },
  { name: "Kimbrough Law", state: "Alabama", website: "https://www.kimbroughlegal.com" },
  { name: "Kaufman & Stigger, PLLC", state: "Kentucky", website: "https://www.kaufmanstigger.com" },
  { name: "Klie Law Offices, PLLC", state: "West Virginia", website: "https://www.klielaw.com" },
  { name: "Koonz, McKenney, Johnson & DePaolis, L.L.P.", state: "Virginia", website: "https://www.injurylaw.com" },
  { name: "Kootenai Law Group, PLLC", state: "Idaho", website: "https://www.kootenailawgroup.com" },
  { name: "Keller Law Firm, P.L.L.C.", state: "Montana", website: "https://www.kellerlawfirmmt.com" },
  { name: "Kirkpatrick & Zeiler, LLC", state: "Wyoming", website: "https://www.kzwyolaw.com" },
  { name: "Kaplan Law, LLC", state: "Oregon", website: "https://www.kaplanlaworegon.com" },
  { name: "Kravitz Law Firm", state: "Nevada", website: "https://www.kravitzlaw.com" },
  { name: "Keith Law Firm, P.A.", state: "Arkansas", website: "https://www.keithlawfirm.com" },
  { name: "Kilpatrick Law Group", state: "Vermont", website: "https://www.kilpatricklawgroup.com" },
  { name: "Kimball Tirey & St. John LLP", state: "Maine", website: "https://www.kts-law.com" },
  { name: "Kraft Davies, PLLC", state: "Washington", website: "https://www.kraftdavies.com" },
  { name: "Keegan Law", state: "New Hampshire", website: "https://www.keeganlaw.com" },
  { name: "Kimmel, Carter, Roman, Peltz & O'Neill, P.A.", state: "Delaware", website: "https://www.kimmelcarter.com" },
  { name: "Kocian Law Group", state: "Connecticut", website: "https://www.kolaw.com" },
  { name: "Kathryn L. Meyerle, P.C.", state: "Iowa", website: "https://www.meyerlelawfirm.com" },
  { name: "Kippley & Associates, LLP", state: "South Dakota", website: "https://www.kippley.com" },
  { name: "Kirshenbaum & Kirshenbaum", state: "Rhode Island", website: "https://www.kirshenbaumlaw.com" },
  { name: "Killian Davis", state: "Colorado", website: "https://www.killiandavis.com" },
  { name: "Kessner, Umebayashi, Bain & Matsunaga", state: "Hawaii", website: "https://www.kubmlaw.com" },
  { name: "Kherkher Garcia, LLP", state: "Texas", website: "https://www.kherkhergarcialaw.com" },
  { name: "Kinney, Fernandez & Boire, P.A.", state: "Florida", website: "https://www.kfblegal.com" },
  { name: "Khakshooy & Associates", state: "California", website: "https://www.kandalawfirm.com" },
  { name: "Kaplan Lawyers PC", state: "New York", website: "https://www.1800thelaw2.com" },
  { name: "Kline & Specter, P.C.", state: "Pennsylvania", website: "https://www.klinespecter.com" },
  { name: "Karlin, Fleisher & Falkenberg, LLC", state: "Illinois", website: "https://www.kfflegal.com" },
  { name: "Kisling, Nestico & Redick, LLC", state: "Ohio", website: "https://www.knrlegal.com" },
  { name: "Keane Law Firm", state: "Michigan", website: "https://www.keanelaw.com" },
  { name: "Kiley Law Group", state: "Massachusetts", website: "https://www.kileylawgroup.com" },
  { name: "Kreizer Law", state: "New Jersey", website: "https://www.kreizer-law.com" },
  { name: "Karp, Wigodsky, Norwind, Kudel & Gold, P.A.", state: "Maryland", website: "https://www.injuryandinsurance.com" },
  { name: "Killino Firm", state: "Minnesota", website: "https://www.killinofirm.com" },
  { name: "Kallenbach Law Offices, L.L.C.", state: "Missouri", website: "https://www.kallenbachlaw.com" },
  { name: "Kinnard, Clayton & Beveridge", state: "Tennessee", website: "https://www.kinnardfirm.com" },
  { name: "Kelsch, Kelsch, Ruff & Kranda", state: "North Dakota", website: "https://www.kkrklawyers.com" },
  { name: "Kopka Pinkus Dolin, P.C.", state: "Indiana", website: "https://www.kpdlegal.com" },
  { name: "Karpe Litigation Group", state: "Wisconsin", website: "https://www.karpelaw.com" },
  { name: "Keller Law Offices, LLC", state: "Kansas", website: "https://www.topekalaw.com" },
  { name: "Kesler & Rust", state: "Utah", website: "https://www.keslerrust.com" },
  { name: "Kemp & Associates, P.C.", state: "Alaska", website: "https://www.kempalaska.com" },
  { name: "Knapp & Roberts", state: "Arizona", website: "https://www.knappandroberts.com" },
  { name: "Laird Law", state: "Oklahoma", website: "https://www.lairdlawfirm.com" },
  { name: "Lamson, Dugan & Murray, LLP", state: "Nebraska", website: "https://www.ldmlawyers.com" },
  { name: "Ledbetter Law Firm", state: "New Mexico", website: "https://www.ledbetter-law.com" },
  { name: "Louthian Law Firm, P.A.", state: "South Carolina", website: "https://www.louthianlaw.com" },
  { name: "Lunsford, Baskin & Priebe, PLLC", state: "Mississippi", website: "https://www.lbpattorneys.com" },
  { name: "Lanier Law Firm, P.A.", state: "North Carolina", website: "https://www.lanierlawfirm.com" },
  { name: "Lenahan Law Firm", state: "Georgia", website: "https://www.lenahanfirm.com" },
  { name: "Lloyd & Hogan", state: "Alabama", website: "https://www.lloydandhogan.com" },
  { name: "Lorenzo Law Firm", state: "Kentucky", website: "https://www.lorenzolaw.com" },
  { name: "Lowther Johnson Attorneys at Law", state: "West Virginia", website: "https://www.wvadvocates.com" },
  { name: "Lerner and Rowe Injury Attorneys", state: "Virginia", website: "https://www.lernerandrowe.com" },
  { name: "Litster Frost Injury Lawyers", state: "Idaho", website: "https://www.litster.com" },
  { name: "Leo S. Thoennes Attorney at Law", state: "Montana", website: "https://www.montanatriallawyers.com" },
  { name: "Lonabaugh & Riggs, LLP", state: "Wyoming", website: "https://www.lonabaughriggs.com" },
  { name: "Levin, Etengoff & Siegel, LLC", state: "Oregon", website: "https://www.leslaw.com" },
  { name: "Levar Law Injury & Accident Lawyers", state: "Arkansas", website: "https://www.levarlaw.com" },
  { name: "Lia Law Firm, P.C.", state: "Vermont", website: "https://www.lialawfirm.com" },
  { name: "Lipman & Katz, P.A.", state: "Maine", website: "https://www.lipmankatz.com" },
  { name: "Luvera Law Firm", state: "Washington", website: "https://www.luveralawfirm.com" },
  { name: "Law Office of Manning & Zimmerman, PLLC", state: "New Hampshire", website: "https://www.manningzimmermanlaw.com" },
  { name: "Levin, Papantonio, Thomas, Mitchell, Rafferty & Proctor, P.A.", state: "Delaware", website: "https://www.levinlaw.com" },
  { name: "Loughlin, Fitzgerald, O'Brien, Kenney & Haggerty, P.C.", state: "Connecticut", website: "https://www.lfoklaw.com" },
  { name: "Larew Law Office", state: "Iowa", website: "https://www.larewlawoffice.com" },
  { name: "Lynn, Jackson, Shultz & Lebrun, P.C.", state: "South Dakota", website: "https://www.lynnjackson.com" },
  { name: "Ladouceur & Associates, Ltd.", state: "Rhode Island", website: "https://www.ladouceurlaw.com" },
  { name: "Levine Law", state: "Colorado", website: "https://www.injurylawcolorado.com" },
  { name: "Law Offices of Paul B. Masterson", state: "Hawaii", website: "https://www.mastersonlawoffices.com" },
  { name: "Lorenz & Lorenz, L.L.P.", state: "Texas", website: "https://www.lorenzandlorenz.com" },
  { name: "Leesfield & Partners, P.A.", state: "Florida", website: "https://www.leesfield.com" },
  { name: "Law Offices of Daniel A. Gibalevich", state: "California", website: "https://www.danielgibilaweich.com" },
  { name: "Lipsig, Shapey, Manus & Moverman, P.C.", state: "New York", website: "https://www.lipsig.com" },
  { name: "Leppler Injury Law", state: "Pennsylvania", website: "https://www.lepplerinjurylaw.com" },
  { name: "Lipkin & Apter", state: "Illinois", website: "https://www.lipkinandapter.com" },
  { name: "Landskroner Grieco Merriman, LLC", state: "Ohio", website: "https://www.lgmlegal.com" },
  { name: "Lee Steinberg Law Firm, P.C.", state: "Michigan", website: "https://www.leesteinberg.com" },
  { name: "Law Office of John J. Sheehan", state: "Massachusetts", website: "https://www.sheehanlaw.com" },
  { name: "Law Offices of Anthony Carbone, P.C.", state: "New Jersey", website: "https://www.carbonelaw.com" },
  { name: "Law Offices of Peter T. Nicholl", state: "Maryland", website: "https://www.pnichollaw.com" },
  { name: "Larson King, LLP", state: "Minnesota", website: "https://www.larsonking.com" },
  { name: "Lanzotti & Rau LLC", state: "Missouri", website: "https://www.lanzottirau.com" },
  { name: "Law Office of Stanley A. Davis", state: "Tennessee", website: "https://www.stanleydavislawoffice.com" },
  { name: "Larson Law Office, P.C.", state: "North Dakota", website: "https://www.larson-law.com" },
  { name: "Lipkin & Perkins, P.C.", state: "Indiana", website: "https://www.injurylawteam.com" },
  { name: "LaFond Law Office", state: "Wisconsin", website: "https://www.lafondlaw.com" },
  { name: "Latta Law Firm", state: "Kansas", website: "https://www.lattalawfirm.com" },
  { name: "Larson Law", state: "Utah", website: "https://www.larsonsandcompany.com" },
  { name: "Landmark Law Group", state: "Alaska", website: "https://www.landmarklawgroupak.com" },
  { name: "Langerman Law Offices", state: "Arizona", website: "https://www.langermanlaw.com" },
  { name: "McIntyre Law", state: "Oklahoma", website: "https://www.mcintyre-law.com" },
  { name: "McGuire Law Firm, PC LLO", state: "Nebraska", website: "https://www.omaha-law-firm.com" },
  { name: "McGinn, Montoya, Love & Curry, PA", state: "New Mexico", website: "https://www.mmlclaw.com" },
  { name: "McWhirter, Bellinger & Associates, P.A.", state: "South Carolina", website: "https://www.mcwhirterlaw.com" },
  { name: "McLaughlin & Lauricella, P.A.", state: "Mississippi", website: "https://www.mclaughlinfirm.com" },
  { name: "Marcari, Russotto, Spencer & Balaban, P.C.", state: "North Carolina", website: "https://www.marcarirusottospencerbalaban.com" },
  { name: "Morgan & Morgan", state: "Georgia", website: "https://www.forthepeople.com" },
  { name: "Morris Bart, LLC", state: "Louisiana", website: "https://www.morrisbart.com" },
  { name: "McCutcheon & Hamner, P.C.", state: "Alabama", website: "https://www.mhattorney.com" },
  { name: "Morgan, Collins, Yeast & Salyer", state: "Kentucky", website: "https://www.morgancollinsyeastsalyer.com" },
  { name: "Mani Ellis & Layne, PLLC", state: "West Virginia", website: "https://www.maniellis.com" },
  { name: "MartinWren, P.C.", state: "Virginia", website: "https://www.martinwren.com" },
  { name: "May Rammell & Thompson, Chtd.", state: "Idaho", website: "https://www.mayrt.com" },
  { name: "Murphy Law Firm, P.C.", state: "Montana", website: "https://www.themontanalawyer.com" },
  { name: "Meyer, Shaffer, Stepans & Jones, LLC", state: "Wyoming", website: "https://www.mssjlaw.com" },
  { name: "Maier & Weiss", state: "Oregon", website: "https://www.maierweisslaw.com" },
  { name: "Michael S. Burg & Associates", state: "Nevada", website: "https://www.injurylv.com" },
  { name: "McDaniel Wolff, PLLC", state: "Arkansas", website: "https://www.mwwlawyers.com" },
  { name: "Monette, Barasch, Fitting, McManama", state: "Vermont", website: "https://www.montpelierlaw.com" },
  { name: "Murray, Plumb & Murray", state: "Maine", website: "https://www.mpmlaw.com" },
  { name: "Menzer Law Firm", state: "Washington", website: "https://www.menzerlawfirm.com" }
];

const stateBarLinks = [
  { state: 'Alabama', url: 'https://alabar.org' },
  { state: 'Alaska', url: 'https://alaskabar.org' },
  { state: 'Arizona', url: 'https://azbar.org' },
  { state: 'Arkansas', url: 'https://arkbar.com' },
  { state: 'California', url: 'https://calbar.ca.gov' },
  { state: 'Colorado', url: 'https://cobar.org' },
  { state: 'Connecticut', url: 'https://ctbar.org' },
  { state: 'Delaware', url: 'https://dsba.org' },
  { state: 'District of Columbia', url: 'https://dcbar.org' },
  { state: 'Florida', url: 'https://floridabar.org' },
  { state: 'Georgia', url: 'https://gabar.org' },
  { state: 'Guam', url: 'https://guambar.org' },
  { state: 'Hawaii', url: 'https://hsba.org' },
  { state: 'Idaho', url: 'https://isb.idaho.gov' },
  { state: 'Illinois', url: 'https://isba.org' },
  { state: 'Indiana', url: 'https://inbar.org' },
  { state: 'Iowa', url: 'https://iowabar.org' },
  { state: 'Kansas', url: 'https://ksbar.org' },
  { state: 'Kentucky', url: 'https://kybar.org' },
  { state: 'Louisiana', url: 'https://lsba.org' },
  { state: 'Maine', url: 'https://mainebar.org' },
  { state: 'Maryland', url: 'https://msba.org' },
  { state: 'Massachusetts', url: 'https://massbar.org' },
  { state: 'Michigan', url: 'https://michbar.org' },
  { state: 'Minnesota', url: 'https://mnbar.org' },
  { state: 'Mississippi', url: 'https://msbar.org' },
  { state: 'Missouri', url: 'https://mobar.org' },
  { state: 'Montana', url: 'https://montanabar.org' },
  { state: 'Nebraska', url: 'https://nebar.com' },
  { state: 'Nevada', url: 'https://nvbar.org' },
  { state: 'New Hampshire', url: 'https://nhbar.org' },
  { state: 'New Jersey', url: 'https://njsba.com' },
  { state: 'New Mexico', url: 'https://nmbar.org' },
  { state: 'New York', url: 'https://nysba.org' },
  { state: 'North Carolina', url: 'https://ncbar.org' },
  { state: 'North Dakota', url: 'https://sbnד.org' },
  { state: 'Ohio', url: 'https://ohiobar.org' },
  { state: 'Oklahoma', url: 'https://okbar.org' },
  { state: 'Oregon', url: 'https://osbar.org' },
  { state: 'Pennsylvania', url: 'https://pabar.org' },
  { state: 'Puerto Rico', url: 'https://colegiodeabogadospr.org' },
  { state: 'Rhode Island', url: 'https://ribar.com' },
  { state: 'South Carolina', url: 'https://scbar.org' },
  { state: 'South Dakota', url: 'https://statebarofsouthdakota.com' },
  { state: 'Tennessee', url: 'https://tba.org' },
  { state: 'Texas', url: 'https://texasbar.com' },
  { state: 'Utah', url: 'https://utahbar.org' },
  { state: 'Vermont', url: 'https://vtbar.org' },
  { state: 'Virgin Islands', url: 'https://vibar.org' },
  { state: 'Virginia', url: 'https://vsb.org' },
  { state: 'Washington', url: 'https://wsba.org' },
  { state: 'West Virginia', url: 'https://wvbar.org' },
  { state: 'Wisconsin', url: 'https://wisbar.org' },
  { state: 'Wyoming', url: 'https://wyomingbar.org' },
];

export const PartnersPage: React.FC = () => {
  const uniquePartners = Array.from(new Set(partnersData.map(p => p.name))).sort();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/pi_300x300 copy.png"
              alt="Personal Injury Hotline Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">Personal Injury Hotline™</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
            <div className="border-b pb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Partner Network Disclosure
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Personal Injury Hotline partners with a nationwide network of trusted legal professionals and related service providers.
                  When you submit your information through our website, your details are only shared within this network — specifically with one or more of the following categories of partners, depending on your location and the nature of your claim.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell leads or send your information to anyone outside of these partner categories.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Personal Injury Hotline is not a law firm; instead, we collect inquiries and connect you (with your consent) to licensed attorneys or service providers within our network who can assist with your case.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We use encrypted data transmission and store your information securely in compliance with applicable privacy and data protection laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner Categories</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Law Firms & Case Evaluation Partners</h3>
                    <p className="leading-relaxed mb-2">
                      Licensed personal injury and motor-vehicle accident law firms that provide free claim evaluations and representation services. These include, but are not limited to, firms handling:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Car, truck, motorcycle, and pedestrian accidents</li>
                      <li>Slip-and-fall or premises-liability claims</li>
                      <li>Workplace injury and employer negligence cases</li>
                      <li>Wrongful-death and catastrophic injury matters</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Medical & Rehabilitation Partners</h3>
                    <p className="leading-relaxed">
                      Licensed medical providers, chiropractors, physical therapists, and rehabilitation centers that assist injury victims with post-accident treatment, recovery, and medical documentation.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Insurance & Automotive Service Partners</h3>
                    <p className="leading-relaxed">
                      Select organizations that assist with accident-related needs such as insurance claims, vehicle repair or replacement, and rental assistance while your claim is pending.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Legal Marketing & Case Intake Partners</h3>
                    <p className="leading-relaxed mb-2">
                      Specialized marketing firms, call centers, and intake support teams that assist with data verification, communications, and client matching within our attorney network.
                    </p>
                    <p className="text-sm italic">
                      All leads are generated through our own platform; we do not purchase third-party leads. These partners only assist with communications and intake operations.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Network List</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Below is a representative list of partner law firms in our network (updated periodically). This list will expand as we grow our relationships and maintain compliance with applicable regulations. We are not formally partnered with every firm referenced or listed; any names shown are illustrative examples of attorneys and practices that handle similar cases in our industry.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-700">
                  {uniquePartners.map((name, index) => (
                    <div key={index} className="truncate">{name}</div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  Additional firms and providers may be added periodically based on region and case type.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Attorney License Verification</h2>
                <p className="text-gray-700 mb-4">
                  You can verify an attorney's license and standing through your state's official bar association or licensing authority. Use the links below to access your state's lookup tool.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stateBarLinks.map((bar) => (
                    <a
                      key={bar.state}
                      href={bar.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
                    >
                      <span className="font-medium text-gray-900">{bar.state}</span>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  If your state or territory is not listed above, please refer to your jurisdiction's official court or bar website for license verification. You may also contact us for assistance in locating the appropriate resource.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Attorney Network & Access Notice</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Personal Injury Hotline maintains relationships with select licensed law firms across the United States. Our goal is to provide consumers with access to a national network of qualified personal-injury and motor-vehicle accident attorneys.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When appropriate — and only with your consent — we will connect you with one of these partner firms for a free case evaluation.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="font-semibold text-gray-900 mb-2">PLEASE NOTE</p>
                  <p className="text-gray-700 mb-2">
                    You initially may be connected to a non-attorney representative (for example, an intake specialist or call center partner).
                  </p>
                  <p className="text-gray-700 mb-2">
                    To speak with a licensed attorney directly, you must specifically request to be connected to one.
                  </p>
                  <p className="text-gray-700">
                    We will then arrange a consultation with an attorney in your jurisdiction if your case qualifies.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Legal Disclosures</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm text-gray-700">
                  <p className="font-bold text-red-600 text-base">THIS IS AN ADVERTISEMENT.</p>
                  <p>You are under no obligation to retain a lawyer who contacts you.</p>
                  <p>
                    All content provided on this website is for informational purposes only. Personal Injury Hotline is not a law firm or a lawyer-referral service and does not provide legal advice.
                  </p>
                  <p>
                    All claim evaluations and legal services are performed by independent, third-party licensed attorneys in our network. Participating attorneys and firms may compensate Personal Injury Hotline for marketing, advertising, or administrative support services in accordance with applicable legal-advertising and ethical rules.
                  </p>
                  <p>
                    Participation in this network does not constitute an endorsement or recommendation of any attorney or firm.
                  </p>
                  <p>
                    Submitting your information through this site does not create an attorney–client relationship.
                  </p>
                  <p>
                    An attorney–client relationship is only established after you sign a retainer or engagement agreement with a law firm.
                  </p>
                  <p>
                    Services may not be available in all states. The choice of a lawyer is an important decision and should not be based solely upon advertisements.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Funding & Outcomes Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you pursue a claim, there is no guarantee of any particular outcome, settlement, or monetary advance.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some law firms may assist clients with cash advances or loans during lengthy cases, but such support is at the sole discretion of the law firm or a third-party funding company and is not guaranteed.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Any advance, if offered, is not a settlement of your claim and must typically be repaid from future recovery. You should carefully review any funding agreement or consult with your attorney about such arrangements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Attorney Verification & Transparency</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For your peace of mind, we have provided official state bar resources above to verify the credentials and good standing of any attorney with whom you are connected.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We encourage all users to confirm an attorney's license status and qualifications before engaging representation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Personal Injury Hotline may expand or adjust its network of law firms over time.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are not formally partnered with every law firm named or referenced on this page. Any listed firms are illustrative examples of those handling similar matters. Our network continues to evolve to best serve consumers nationwide.
                </p>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Partner Network Disclosure page is reviewed and updated periodically to reflect current relationships, compliance requirements, and operational changes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to transparency and maintaining full compliance with state bar advertising and TCPA regulations.
                </p>
                <div className="text-sm text-gray-600">
                  <p className="mb-1"><strong>Last Updated:</strong> October 2025</p>
                  <p><strong>Contact:</strong> admin@personalinjuryhotline.co</p>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  This advertisement is intended for general informational purposes and should not be construed as legal advice. Availability of services varies by state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
