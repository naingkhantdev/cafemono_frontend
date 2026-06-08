import { motion } from 'framer-motion'
import { FadeUp, FadeLeft, ScaleIn } from '../components/ui/AnimatedSection'

const team = [
    { name: 'Ms. Kelly', role: 'Head Barista', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', bio: 'Master of latte art with 10 years of experience.' },
    { name: 'Mr. John', role: 'Roast Master', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', bio: 'Sourcing the finest beans from across the globe.' },
    { name: 'Ms. Shelly', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80', bio: 'Creating sweetness that pairs perfectly with coffee.' },
]

const floatingAnim = {
    y: [0, -15, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
}

export default function About() {
    return (
        <div className="bg-cream overflow-hidden">

            {/* HERO SECTION - HIGH IMPACT */}
            <section className="relative min-h-[80vh] flex items-center pt-20 bg-cafe-black">
                <div className="absolute inset-0 bg-grain opacity-20" />
                <div className="max-w-6xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    <FadeLeft>
                        <span className="text-cafe-gold font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Est. 2024</span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream leading-tight mb-6">
                            Crafting <br />
                            <span className="text-cafe-gold italic">Moments</span> of <br />
                            Pure Bliss
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                            We believe that every cup of coffee is a journey. A journey of flavors, 
                            traditions, and passion brewed to perfection.
                        </p>
                    </FadeLeft>

                    <motion.div 
                        animate={floatingAnim}
                        className="relative hidden md:block"
                    >
                        <div className="absolute -inset-4 border border-cafe-gold/30 rounded-full animate-pulse" />
                        <img 
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop" 
                            alt="Premium Coffee" 
                            className="w-full h-[500px] object-cover rounded-[100px] shadow-warm-xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* BRAND STORY - EDITORIAL */}
            <section className="py-24 max-w-6xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-7 relative">
                        <ScaleIn>
                            <img 
                                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop" 
                                alt="Our Process" 
                                className="w-full h-[450px] object-cover rounded-3xl shadow-warm-lg"
                            />
                        </ScaleIn>
                        <motion.div 
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -right-10 hidden lg:block w-64 h-64 bg-brown p-8 rounded-3xl shadow-warm-xl border-t border-white/20"
                        >
                            <p className="text-cream/80 italic text-lg leading-relaxed">
                                "Our mission is to serve more than just coffee; we serve an experience."
                            </p>
                        </motion.div>
                    </div>

                    <div className="md:col-span-5">
                        <FadeUp>
                            <h2 className="font-serif text-4xl font-bold text-cafe-black mb-6">Our Story</h2>
                            <p className="text-cafe-black/70 leading-relaxed mb-6">
                                What started as a small roastery in the heart of Bangkok has grown into a 
                                sanctuary for coffee lovers. We source our beans ethically, ensuring 
                                that every farmer receives the respect and compensation they deserve.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cafe-gold/10 flex items-center justify-center text-cafe-gold">
                                        ✨
                                    </div>
                                    <p className="font-semibold text-cafe-black">Hand-picked Excellence</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cafe-gold/10 flex items-center justify-center text-cafe-gold">
                                        🌿
                                    </div>
                                    <p className="font-semibold text-cafe-black">Sustainable Sourcing</p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* OUR TEAM - PREMIUM GRID */}
            <section className="py-24 bg-cream-light relative">
                <div className="absolute inset-0 bg-grain opacity-10" />
                <div className="max-w-6xl mx-auto px-8 relative z-10">
                    <FadeUp className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-cafe-black mb-4">The Artisans</h2>
                        <p className="text-cafe-black/60 max-w-xl mx-auto">
                            The hands and hearts behind every perfect brew.
                        </p>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white p-4 rounded-[40px] shadow-warm hover:shadow-warm-xl transition-all duration-500 overflow-hidden"
                            >
                                <div className="relative overflow-hidden rounded-[30px] h-80 mb-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="text-center px-4 pb-4">
                                    <h3 className="font-serif text-xl font-bold text-cafe-black mb-1 group-hover:text-brown transition-colors">{member.name}</h3>
                                    <p className="text-cafe-gold font-semibold text-xs tracking-widest uppercase mb-3">{member.role}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        {member.bio}
                                    </p>
                                </div>

                                <div className="absolute top-8 right-8 w-12 h-12 bg-cafe-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 rotate-12 group-hover:rotate-0">
                                    <span className="text-white font-bold">☕</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}