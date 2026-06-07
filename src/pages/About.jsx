import { motion } from 'framer-motion'

const team = [
    { name: 'Ms. Kelly', role: 'Barista', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&auto=format&fit=crop&q=80' },
    { name: 'Mr. John', role: 'Barista', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
    { name: 'Ms. Shelly', role: 'Baker', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80' },
]

export default function About() {
    return (
        <div className="bg-cream min-h-screen">
            <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

                {/* Header */}
                <h1 className="font-serif text-3xl font-bold text-cafe-black text-center mb-8">
                    About us
                </h1>

                {/* Our Story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-cream-light rounded-3xl overflow-hidden mb-6"
                    style={{ boxShadow: '0 2px 12px rgba(123,59,42,0.08)' }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&auto=format&fit=crop"
                        alt="Our Story"
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="font-serif text-xl font-bold text-cafe-black mb-3">Our Story</h2>
                        <p className="text-cafe-black/60 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Aenean commodo ligula eget dolor. We started with a single
                            cup and a dream to create a space where people feel at home.
                            Every bean we select tells the story of the farmers who grew it
                            and the roasters who crafted it.
                        </p>
                    </div>
                </motion.div>

                {/* Our Team */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-cream-light rounded-3xl p-6"
                    style={{ boxShadow: '0 2px 12px rgba(123,59,42,0.08)' }}
                >
                    <h2 className="font-serif text-xl font-bold text-cafe-black text-center mb-6">
                        Our Team
                    </h2>

                    <div className="flex justify-around">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="flex flex-col items-center gap-2 cursor-default"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-cream-dark"
                                    style={{ boxShadow: '0 4px 15px rgba(123,59,42,0.15)' }}
                                />
                                <p className="font-semibold text-cafe-black text-sm text-center">{member.name}</p>
                                <p className="text-brown text-xs font-medium">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    )
}