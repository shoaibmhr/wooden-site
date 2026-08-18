export default function ContactMap() {
  return (
    <div className="h-72 w-full overflow-hidden sm:h-96">
      <iframe
        title="Woodshala location map"
        src="https://www.google.com/maps?q=Jodhpur,Rajasthan,India&output=embed"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
