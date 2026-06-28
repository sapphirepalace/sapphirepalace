export default function FloatingButtons() {
  return (
    <div className="float-btns">
      <a
        href="https://wa.me/923210512345?text=Assalamu%20Alaikum%21%20I%20want%20to%20inquire%20about%20Sapphire%20Event%20Complex%20Palace."
        target="_blank"
        rel="noreferrer"
        className="float-btn float-wa"
      >
        <div className="float-tooltip">Chat on WhatsApp</div>
        <span>💬</span>
      </a>
      <a href="tel:+923210512345" className="float-btn float-call">
        <div className="float-tooltip">Call Now</div>
        <span>📞</span>
      </a>
    </div>
  )
}
