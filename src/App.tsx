import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Nosotros', href: '#sobre' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
]

const CAROUSEL_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1728777185620-4e5f6cff03db?w=1200&h=700&fit=crop&auto=format',
    flavor: 'Naranja',
    tagline: 'El sabor que despierta',
    color: '#fc6c13',
  },
  {
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=700&fit=crop&auto=format',
    flavor: 'Café',
    tagline: 'Frío, intenso, irresistible',
    color: '#5c3d2e',
  },
  {
    img: 'https://images.unsplash.com/photo-1596392301391-e8622b210bd4?w=1200&h=700&fit=crop&auto=format',
    flavor: 'Piña',
    tagline: 'Tropical en cada sorbo',
    color: '#d4a017',
  },
]

const GALLERY_ITEMS = [
  {
    name: 'Naranja',
    img: 'https://images.unsplash.com/photo-1728777186295-6583dd79874e?w=600&h=700&fit=crop&auto=format',
    desc: 'Refrescante y vibrante. El clásico sabor de naranja en su forma más helada.',
    bg: '#fff3e8',
  },
  {
    name: 'Café',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=700&fit=crop&auto=format',
    desc: 'Para los amantes del café. Intenso, cremoso y perfectamente frío.',
    bg: '#f5ede6',
  },
  {
    name: 'Piña',
    img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600&h=700&fit=crop&auto=format',
    desc: 'El escape tropical que necesitas. Dulce, ácido y totalmente adictivo.',
    bg: '#fffde8',
  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(252,108,19,0.12)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <span
            className="text-3xl leading-none select-none"
            style={{ fontFamily: 'Anton, sans-serif', color: '#fc6c13', letterSpacing: '0.02em' }}
          >
            FROZZA
          </span>
          <span
            className="w-2 h-2 rounded-full mt-1"
            style={{ background: '#fbeca0', border: '2px solid #fc6c13' }}
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold tracking-wide transition-colors duration-200"
                style={{ color: scrolled ? '#1a1a1a' : '#ffffff', fontFamily: 'Nunito, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fc6c13')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled ? '#1a1a1a' : '#ffffff')
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-200"
              style={{ background: scrolled ? '#1a1a1a' : '#ffffff' }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 shadow-lg"
          style={{ background: 'rgba(255,255,255,0.98)' }}
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-semibold"
                  style={{ color: '#1a1a1a', fontFamily: 'Nunito, sans-serif' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % CAROUSEL_SLIDES.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrent(i)
    startTimer()
  }

  const slide = CAROUSEL_SLIDES[current]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#1a1a1a' }}
    >
      {/* Carousel background image */}
      {CAROUSEL_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.img}
            alt={`Frozza sabor ${s.flavor}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </div>
      ))}

      {/* Orange accent bar top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: '#fc6c13' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          style={{ background: '#fc6c13', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
        >
          Sabor {slide.flavor}
        </div>

        <h1
          className="text-6xl md:text-8xl lg:text-9xl leading-none mb-4 transition-all duration-500"
          style={{ fontFamily: 'Anton, sans-serif', color: '#fbeca0', letterSpacing: '0.01em' }}
        >
          FROZZA
        </h1>

        <p
          className="text-xl md:text-2xl font-medium mb-4 transition-all duration-500"
          style={{ color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
        >
          {slide.tagline}
        </p>

        <p
          className="text-base md:text-lg max-w-lg mx-auto mb-10 opacity-90"
          style={{ color: '#fbeca0', fontFamily: 'Nunito, sans-serif' }}
        >
          Bebidas heladas artesanales en tres sabores únicos. La experiencia más fría del verano.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#galeria"
            className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ background: '#fc6c13', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
          >
            Ver Sabores
          </a>
          <a
            href="#sobre"
            className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105"
            style={{
              background: 'transparent',
              color: '#fbeca0',
              border: '2px solid #fbeca0',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            Sobre Nosotros
          </a>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: i === current ? '#fc6c13' : 'rgba(251,236,160,0.5)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Flavor indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-10 hidden md:flex">
        {CAROUSEL_SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="flex items-center gap-2 group"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span
              className="text-xs font-bold tracking-wider transition-all duration-200"
              style={{
                color: i === current ? '#fbeca0' : 'rgba(255,255,255,0.4)',
                fontFamily: 'Nunito, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
              }}
            >
              {s.flavor}
            </span>
            <div
              className="w-0.5 transition-all duration-300"
              style={{
                height: i === current ? 32 : 16,
                background: i === current ? '#fc6c13' : 'rgba(255,255,255,0.3)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      id="sobre"
      className="py-24 px-6"
      style={{ background: '#fbeca0' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#fc6c13', fontFamily: 'Nunito, sans-serif' }}
          >
            Nuestra Historia
          </span>
          <h2
            className="text-5xl md:text-6xl mt-2"
            style={{ fontFamily: 'Anton, sans-serif', color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            SOBRE NOSOTROS
          </h2>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{ background: '#fc6c13' }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misión */}
          <div
            className="rounded-3xl p-10 flex flex-col gap-6 group transition-transform duration-300 hover:-translate-y-1"
            style={{ background: '#ffffff', boxShadow: '0 4px 40px rgba(252,108,19,0.08)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                style={{ background: '#fc6c13' }}
              >
                🎯
              </div>
              <h3
                className="text-3xl"
                style={{ fontFamily: 'Anton, sans-serif', color: '#fc6c13', letterSpacing: '0.02em' }}
              >
                MISIÓN
              </h3>
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#4a4a4a', fontFamily: 'Nunito, sans-serif' }}
            >
              En Frozza, nuestra misión es llevar frescura y alegría a cada momento del día con bebidas heladas
              de alta calidad, elaboradas con ingredientes naturales y recetas únicas. Buscamos que cada sorbo
              sea una experiencia memorable que conecte a las personas con los sabores auténticos de la naturaleza.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#4a4a4a', fontFamily: 'Nunito, sans-serif' }}
            >
              Nos comprometemos a ofrecer productos accesibles, saludables y deliciosos para toda la familia,
              sin comprometer la calidad ni el sabor que nos distingue.
            </p>
          </div>

          {/* Visión */}
          <div
            className="rounded-3xl p-10 flex flex-col gap-6 group transition-transform duration-300 hover:-translate-y-1"
            style={{ background: '#fc6c13', boxShadow: '0 4px 40px rgba(252,108,19,0.25)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                style={{ background: '#fbeca0' }}
              >
                🌟
              </div>
              <h3
                className="text-3xl"
                style={{ fontFamily: 'Anton, sans-serif', color: '#ffffff', letterSpacing: '0.02em' }}
              >
                VISIÓN
              </h3>
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.95)', fontFamily: 'Nunito, sans-serif' }}
            >
              Aspiramos a ser la marca de bebidas heladas más reconocida y querida en toda la región,
              expandiendo nuestra presencia a nivel nacional e internacional. Visualizamos un futuro donde
              Frozza sea sinónimo de calidad, frescura e innovación en el mundo de las bebidas artesanales.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.95)', fontFamily: 'Nunito, sans-serif' }}
            >
              Queremos construir una comunidad fiel de clientes que compartan nuestra pasión por los sabores
              auténticos y la cultura de disfrutar cada instante al máximo.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-14 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8"
          style={{ background: '#ffffff', boxShadow: '0 4px 40px rgba(252,108,19,0.08)' }}
        >
          {[
            { num: '3', label: 'Sabores únicos' },
            { num: '100%', label: 'Ingredientes naturales' },
            { num: '∞', label: 'Felicidad en cada sorbo' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl md:text-5xl"
                style={{ fontFamily: 'Anton, sans-serif', color: '#fc6c13' }}
              >
                {stat.num}
              </div>
              <div
                className="text-sm font-semibold mt-1"
                style={{ color: '#4a4a4a', fontFamily: 'Nunito, sans-serif' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery({ onOrder }: { onOrder: (item: typeof GALLERY_ITEMS[0]) => void }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="galeria" className="py-24 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#fc6c13', fontFamily: 'Nunito, sans-serif' }}
          >
            Nuestros Productos
          </span>
          <h2
            className="text-5xl md:text-6xl mt-2"
            style={{ fontFamily: 'Anton, sans-serif', color: '#1a1a1a', letterSpacing: '0.02em' }}
          >
            GALERÍA DE SABORES
          </h2>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{ background: '#fc6c13' }}
          />
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: '#6a6a6a', fontFamily: 'Nunito, sans-serif' }}
          >
            Tres sabores que conquistan. Elige el tuyo o pruébalos todos. Haz clic en "Pedir ahora" para ordenar por WhatsApp.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 group"
              style={{
                transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow:
                  hovered === i
                    ? '0 20px 60px rgba(252,108,19,0.22)'
                    : '0 4px 24px rgba(0,0,0,0.07)',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOrder(item)}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: 320, background: item.bg }}
              >
                <img
                  src={item.img}
                  alt={`Frozza sabor ${item.name}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hovered === i ? 'scale(1.07)' : 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
                {/* Flavor badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow"
                  style={{ background: '#fc6c13', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
                >
                  {item.name}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6" style={{ background: item.bg }}>
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'Anton, sans-serif', color: '#1a1a1a', letterSpacing: '0.02em' }}
                >
                  {item.name.toUpperCase()}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#5a5a5a', fontFamily: 'Nunito, sans-serif' }}
                >
                  {item.desc}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onOrder(item)
                  }}
                  className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:opacity-95"
                  style={{ background: '#fc6c13', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
                >
                  <span>Pedir ahora</span>
                  <span
                    className="transition-transform duration-200"
                    style={{ transform: hovered === i ? 'translateX(4px)' : 'translateX(0)' }}
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrderModal({
  item,
  onClose,
}: {
  item: typeof GALLERY_ITEMS[0] | null
  onClose: () => void
}) {
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')

  if (!item) return null

  const handleWhatsAppOrder = () => {
    const text = `¡Hola Frozza! 🧊 Quiero pedir ${qty}x Frozza Sabor *${item.name}*.${notes ? ` Notas: ${notes}` : ''}`
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in duration-200"
        style={{ background: '#ffffff', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
          style={{ background: '#f5f5f5', color: '#1a1a1a', border: 'none', cursor: 'pointer' }}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={item.img}
            alt={item.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-md"
          />
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: '#fc6c13', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
            >
              Pedido Rápido
            </span>
            <h3
              className="text-2xl mt-1"
              style={{ fontFamily: 'Anton, sans-serif', color: '#1a1a1a', letterSpacing: '0.02em' }}
            >
              FROZZA {item.name.toUpperCase()}
            </h3>
          </div>
        </div>

        <p
          className="text-sm mb-6"
          style={{ color: '#5a5a5a', fontFamily: 'Nunito, sans-serif' }}
        >
          {item.desc}
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label
            className="block text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: '#1a1a1a', fontFamily: 'Nunito, sans-serif' }}
          >
            Cantidad
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
              style={{ background: '#fbeca0', color: '#1a1a1a', border: 'none', cursor: 'pointer' }}
            >
              -
            </button>
            <span
              className="text-xl font-bold w-8 text-center"
              style={{ fontFamily: 'Anton, sans-serif', color: '#fc6c13' }}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
              style={{ background: '#fc6c13', color: '#ffffff', border: 'none', cursor: 'pointer' }}
            >
              +
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label
            className="block text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: '#1a1a1a', fontFamily: 'Nunito, sans-serif' }}
          >
            Notas adicionales (opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: Menos hielo, extra dulce..."
            className="w-full p-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#fc6c13]"
            style={{ borderColor: '#e5e5e5', fontFamily: 'Nunito, sans-serif', resize: 'none', height: '80px' }}
          />
        </div>

        {/* Action */}
        <button
          onClick={handleWhatsAppOrder}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02]"
          style={{ background: '#25D366', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
        >
          <span>📱 Enviar pedido por WhatsApp</span>
        </button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer id="contacto" style={{ background: '#fc6c13' }}>
      {/* Wave divider */}
      <div style={{ marginBottom: -2 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2
              className="text-5xl mb-3"
              style={{ fontFamily: 'Anton, sans-serif', color: '#fbeca0', letterSpacing: '0.02em' }}
            >
              FROZZA
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Nunito, sans-serif' }}
            >
              Bebidas heladas artesanales con los mejores sabores. Naranja, Café y Piña para refrescar tu día.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-bold tracking-widest uppercase mb-5"
              style={{ color: '#fbeca0', fontFamily: 'Nunito, sans-serif' }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Nunito, sans-serif', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fbeca0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold tracking-widest uppercase mb-5"
              style={{ color: '#fbeca0', fontFamily: 'Nunito, sans-serif' }}
            >
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="https://wa.me/1234567890?text=Hola%20Frozza,%20quiero%20hacer%20un%20pedido"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm font-medium group transition-opacity hover:opacity-90"
                  style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Nunito, sans-serif', textDecoration: 'none' }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
                    style={{ background: 'rgba(251,236,160,0.25)' }}
                  >
                    📱
                  </span>
                  <div>
                    <div className="text-xs opacity-75 mb-0.5">WhatsApp</div>
                    <div>+1 (234) 567-8900</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/frozza"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm font-medium group transition-opacity hover:opacity-90"
                  style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Nunito, sans-serif', textDecoration: 'none' }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
                    style={{ background: 'rgba(251,236,160,0.25)' }}
                  >
                    📸
                  </span>
                  <div>
                    <div className="text-xs opacity-75 mb-0.5">Instagram</div>
                    <div>@frozza</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@frozza.com"
                  className="flex items-center gap-3 text-sm font-medium group transition-opacity hover:opacity-90"
                  style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Nunito, sans-serif', textDecoration: 'none' }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
                    style={{ background: 'rgba(251,236,160,0.25)' }}
                  >
                    ✉️
                  </span>
                  <div>
                    <div className="text-xs opacity-75 mb-0.5">Email</div>
                    <div>hola@frozza.com</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'rgba(251,236,160,0.3)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Nunito, sans-serif' }}
          >
            © {new Date().getFullYear()} Frozza. Todos los derechos reservados.
          </p>
          <div className="flex gap-3">
            {['Naranja', 'Café', 'Piña'].map((f) => (
              <span
                key={f}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(251,236,160,0.25)',
                  color: '#fbeca0',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [orderItem, setOrderItem] = useState<typeof GALLERY_ITEMS[0] | null>(null)

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Gallery onOrder={(item) => setOrderItem(item)} />
      <Footer />
      <OrderModal item={orderItem} onClose={() => setOrderItem(null)} />
    </div>
  )
}
