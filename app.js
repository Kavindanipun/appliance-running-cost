let country="us";
const $=x=>document.getElementById(x);
const money=(v)=>country==="uk"?"£"+v.toFixed(2):"$"+v.toFixed(2);
document.querySelectorAll(".countryBtn").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".countryBtn").forEach(x=>x.classList.remove("active"));b.classList.add("active");country=b.dataset.country;
 if(country==="uk"){$("rateLabel").textContent="Electricity rate (p/kWh)";$("rate").value="26.32"}else{$("rateLabel").textContent="Electricity rate ($/kWh)";$("rate").value=".18"}
});
document.querySelectorAll(".presets button").forEach(b=>b.onclick=()=>{$("watts").value=b.dataset.w});
document.querySelectorAll("[data-set]").forEach(a=>a.onclick=()=>{$("watts").value=a.dataset.set});
$("form").onsubmit=e=>{
 e.preventDefault();let w=+$("watts").value,h=+$("hours").value,d=+$("days").value,r=+$("rate").value;
 let rate=country==="uk"?r/100:r, kw=w/1000, hour=kw*rate, day=hour*h, month=day*d, year=month*12, kwhm=kw*h*d;
 let save=hour*d;
 $("result").hidden=false;
 $("result").innerHTML=`<h3>Estimated electricity running cost</h3><div class="metrics"><div class="metric"><b>${money(hour)}</b><span>per hour</span></div><div class="metric"><b>${money(day)}</b><span>per day</span></div><div class="metric"><b>${money(month)}</b><span>per month</span></div><div class="metric"><b>${money(year)}</b><span>per year</span></div></div><p class="saving"><strong>Energy:</strong> about ${kwhm.toFixed(1)} kWh/month. <strong>What if:</strong> using it 1 hour less on each selected day would save about ${money(save)}/month at the entered rate.</p>`;
 $("result").scrollIntoView({behavior:"smooth",block:"center"});
};
$("year").textContent=new Date().getFullYear();