getData();
let sortingnumber = '';
//VARIABLES DECLARATION
let fromd = '2021-08-07';
let tod = '2021-08-09';
let removercount = 0;
let check = false;
let zakupionovar = 0;
let sprzedanovar = 0;
let stock2var = 0;
let todarray = [];
let workingarray =[];
let oddoreven = 1;
let index, index2, pricevar, stockvar, wartoscvar;

const date = new Date();
  let day = date.getDate();
  if(day<10) day = '0'+day;
  let month = date.getMonth() +1;
  if(month<10) month = '0'+month;
  let year = date.getFullYear();
  let UTCdate = year.toString() +'-'+month.toString()+'-'+day.toString();

tod = UTCdate;

      async function getData() {
        const response = await fetch('/api');
        //fetching the db data
        const data = await response.json();
        let editdata = [];
        
        console.log(data);
        //establishing which products to show from the first date
        editdata = data.filter(x => x.date == fromd);
        //establishing which products to show from the second date
        todarray = data.filter(x => x.date == tod);
        for (let i = 0; i<todarray.length; i++) {  
          if (editdata.find(x => x.productname == todarray[i].productname) == undefined) editdata.push(todarray[i]);
        }
        //SORTOWANIEEE
        if (sortingnumber == 'produkt' ) {
          editdata.sort(function(a,b){
             let textA = a.productname.toUpperCase();
              let textB = b.productname.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              }
          );
        } else if (sortingnumber == 'ilosc') {
          editdata.sort(function(a,b){
            {return a.stock-b.stock}
              }
          );
        } else if (sortingnumber == 'cena') {
          editdata.sort(function(a,b){
            {return a.price-b.price}
              }    
            );
        } else if (sortingnumber == 'wartosc') {
          editdata.sort(function(a,b){
            {return (a.price * a.stock)-(b.price * b.stock)}
              }
          );
        }
        console.log(editdata);
        
        // BUDOWANIE CALEJ STRONKI
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        

        //thead
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        // BUTTONS
        const prod = document.createElement('th');
        const prodBtn = document.createElement('button');
        prodBtn.textContent = 'Produkt';
        prod.append(prodBtn);

        const ilosc = document.createElement('th');
        const iloscBtn = document.createElement('button');
        iloscBtn.textContent = `Ilość ${fromd}`;
        ilosc.append(iloscBtn);

        const zakupiono = document.createElement('th');
        const zakupionoBtn = document.createElement('button');
        zakupionoBtn.textContent = 'Zakupiono szt.';
        zakupiono.append(zakupionoBtn);

        const sprzedano = document.createElement('th');
        const sprzedanoBtn = document.createElement('button');
        sprzedanoBtn.textContent = 'Sprzedano szt.';
        sprzedano.append(sprzedanoBtn);

        const ilosc2 = document.createElement('th');
        const ilosc2Btn = document.createElement('button');
        ilosc2Btn.textContent = `Ilość ${tod}`;
        ilosc2.append(ilosc2Btn);

        const cena = document.createElement('th');
        const cenaBtn = document.createElement('button');
        cenaBtn.textContent = 'Cena';
        cena.append(cenaBtn);

        const wartosc = document.createElement('th');
        const wartoscBtn = document.createElement('button');
        wartoscBtn.textContent = 'Wartość produktów';
        wartosc.append(wartoscBtn);
        // APPENDING EVERYTHING TO THE DOCUMENT.BODY
        tr.append(prod, ilosc, zakupiono, sprzedano, ilosc2, cena, wartosc);
        thead.append(tr);
        table.append(thead);
        table.append(tbody);
        document.body.append(table);


        // TWORZENIE TABELI         

        for (item of editdata) {
            
            const root = document.createElement('tr');
            zakupionovar = 0;
            sprzedanovar = 0;
            stock2var = 0;
            // naprzemienny kolor rzedów w tabeli
            if (oddoreven%2 == 0) {
            root.classList.add('even');
        } else {
            root.classList.add('odd');
            }
            oddoreven++;
            // wydzielenie wszystkich wpisow jednego produktu
            workingarray = data.filter(x => x.productname == item.productname);
            if (workingarray.find(x => x.date == tod) == undefined ) {
              // prowizoryczny error catch
            }
            else  {
              stock2var = workingarray.find(x => x.date == tod).stock;
            }
            
            // POSORTOWANIE wydzielonych wpisow po dacie
            workingarray.sort(function(a,b){
               let textA = a.date;
               let textB = b.date;
               return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
               }
            );
              //Pozyskanie indexow wpisow z pierwszej i drugiej daty
              index = workingarray.findIndex(x => x.date == fromd)+1;
              index2 = workingarray.findIndex(x => x.date == tod)+1;
              
            // LOOP do policzenia zakupiono i sprzedano
            for (let y = index; y<index2; y++) {
              if (workingarray[index-1] == undefined || workingarray[index2-1] == undefined ) {
                // prowizoryczny error catch
              }
              else if (workingarray[y-1].stock < workingarray[y].stock) {
                zakupionovar+=(workingarray[y].stock-workingarray[y-1].stock)

              } else if (workingarray[y-1].stock > workingarray[y].stock) {
                sprzedanovar+=(workingarray[y-1].stock-workingarray[y].stock)
              } 
            }
               
            // tworzenie rzedow w tabeli
            const productname = document.createElement('td');
            const stock = document.createElement('td');
            const ilosczakupiono = document.createElement('td');
            const iloscsprzedano = document.createElement('td');
            const stock2 = document.createElement('td');
            const price = document.createElement('td');
            const wartosc = document.createElement('td');

            // wypełnianie komórek tabeli
            productname.textContent = `${item.productname}`;
            if (item.date == fromd) stockvar = item.stock;
              else stockvar = 0;
            stock.textContent = stockvar;
            ilosczakupiono.textContent = zakupionovar;
            iloscsprzedano.textContent = sprzedanovar;
            stock2.textContent = stock2var;
            if (workingarray[index2] != undefined) {
              pricevar = workingarray[index2].price
            } else pricevar = item.price;
            price.textContent = pricevar.toFixed(2) +' PLN'; 
            wartoscvar = pricevar * stock2var;
            wartosc.textContent = wartoscvar.toFixed(2) +' PLN';
            
            //wrzucenie wszystkiego na strone
            root.append(productname, stock, ilosczakupiono, iloscsprzedano, stock2, price, wartosc);
            tbody.append(root);
            
            document.querySelector('table').append(tbody);
        }

        //BUTTON FUNCTIONALITY 
        prodBtn.onclick = function() { 
          sortingnumber = 'produkt';
          document.querySelector('table').remove();
          getData(); };
        cenaBtn.onclick = function() { 
          sortingnumber = 'cena';
          document.querySelector('table').remove();
          getData();
        };

        iloscBtn.onclick = function() { 
          sortingnumber = 'ilosc';
          document.querySelector('table').remove();
          getData();
           };
        wartoscBtn.onclick = function() {  
          sortingnumber = 'ilosc';
          document.querySelector('table').remove();
          getData();
           };

      }

let form = document.querySelector('.form');
let submitBtn = document.querySelector('.submitBtn')

// FORMULARZ DATOWY
function getDataForm(e) {
  e.preventDefault();
  let formData = new FormData(form);
  fromd = formData.get('fromDate');
  tod = formData.get('toDate');
  alert(formData.get('fromDate') + ' - ' + formData.get('toDate'));
  document.querySelector('table').remove();
  getData();
}

document.addEventListener('DOMContentLoaded', function() {
  submitBtn.addEventListener('click', getDataForm, false);

}, false);