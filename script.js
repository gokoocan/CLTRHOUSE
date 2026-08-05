// CLTR — basit scroll reveal ve küçük etkileşimler
const items = document.querySelectorAll('.panel, .discord, .hero-copy, .hero-mark');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:'translateY(18px)'},{opacity:1, transform:'translateY(0)'}],
        {duration:650, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'}
      );
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
items.forEach(el=>observer.observe(el));
