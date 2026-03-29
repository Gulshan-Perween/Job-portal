import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'

const categories = [
  { label: "Frontend", emoji: "🎨" },
  { label: "Backend", emoji: "⚙️" },
  { label: "Fullstack", emoji: "🔗" },
  { label: "Mobile", emoji: "📱" },
  { label: "DevOps", emoji: "🚀" },
  { label: "Data Science", emoji: "📊" },
  { label: "UI/UX", emoji: "✏️" },
  { label: "Machine Learning", emoji: "🤖" },
  { label: "Cloud", emoji: "☁️" },
  { label: "Cybersecurity", emoji: "🔒" },
]

const CategoryCarousel = ({ onCategorySelect }) => {
  return (
    <section className="bg-[#0f0a1e] py-16 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Explore by Category
        </h2>
        <p className="text-gray-500 text-sm text-center mb-10">Click a category to browse matching jobs</p>

        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
              >
                <button
                  onClick={() => onCategorySelect(cat.label)}
                  className="w-full mx-1 py-4 px-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition duration-200 flex flex-col items-center gap-2 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {cat.emoji}
                  </span>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition">
                    {cat.label}
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/20 hover:bg-white/10" />
          <CarouselNext className="text-white border-white/20 hover:bg-white/10" />
        </Carousel>
      </div>
    </section>
  )
}

export default CategoryCarousel