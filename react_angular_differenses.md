Skillnader mellan React och Angular
-	Båda ramverken är verktyg för att bygga SPA (Single-Page Applications), till skillnad från andra ramverk, exempelvis (MVC) där sidor renderas om vid hämtning eller uppdatering. Tidigare fanns endast jQuery att tillgå för att göra förändringar utan att ladda om sidan.

-	Både React och Angular bygger på uppdelning i komponenter, vilket låter oss återanvända logik och även presentation var det än behövs i applikationen. Den stora skillnaden är att Angular är betydligt mer strikt i strukturen än React.


-	Angular erbjuder en helhetslöning för front-end och innehåller alla delar som behövs utan att extra paket behöver installeras. Angular har åsikter om hur en webapp bör struktureras och byggs i typescript. När en component skapas I angular så skapas 4 delar : logiken i Typescript, en css/scss fil för styling samt en html sida. 
För att göra använda delad funktionalitet som behöver användas över hela applikationen används services. Detta är en typescript fil som agerar ‘provider’ och instantieras på en central plats och kan sedan användas utav alla angular komponenter. Angular har inbyggda HTTP moduler och Pipes. Pipes är små hjälpklasser som t.ex kan användas för att visa upp data på ett visst sätt. Ett exempel är den inbyggda datepipen som kan användas för att skriva ut datum på valt format, det går även att bygga egna pipes för rendering eller annat.

-	React är än mer ‘lättviktig’ variant och låter utvecklaren själv bestämma sin struktur, koden kan skrivas i både typescript eller javascript. React kan komplettera en befintlig webapp på ett sätt som inte Angular kan, då angular har en bestämd struktur över beroenden och hu ren component skall vara, så går det att göra en egen struktur över det själv i React. En av de största skillnaderna är att react levererar genererad html I render funktionen, den saknar helt egna HTML filer till skillnad från Angular. Services-tänket existerar inte på samma sätt, även om det går att efterlikna. 

Exempel på Angulars komponentstruktur:
-	Components/Order
o	Order.component.html – innehåller vyn i HTML
o	Order.component.ts – innehåller logiken i typescript
o	Order.component.scss – innehåller styling i SCSS 
o	Order.spec.ts – innehåller test
-	Services/
o	ApiService.ts – en tjänst för att anropa ett API
o	OrderMappingService.ts – exempel på tjänst
-	Modules/
o	app.module.ts – innehåller alla importer av externa bibliotek, tjänster samt komponenter
o	app-routing.module.ts – innehåller routes till komponenter

React har snarare best practices men tvingar inte utvecklare att följa ett visst mönster. Det har en lägre inlärningskurva än Angular och tilltalar utvecklare som är duktiga på JavaScript. Angular använder MVC (Model View Controller) mönstret och använder tydliga klasskomponenter och en struktur som mer tilltalar en utvecklare som är van vid hårt typade object-orienterade språk, vilket kan vara en fördel om man kommer från .NET världen som använder MVC som mönster i .NET utveckling. 

 


