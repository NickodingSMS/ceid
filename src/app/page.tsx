import Image from "next/image";

const catData = [
  { 
    title: "Siamese", 
    description: "Known for their striking blue eyes and vocal nature. These elegant cats are highly social and love to interact with their human companions.",
    image: "https://placekitten.com/300/300?random=1" 
  },
  { 
    title: "Maine Coon", 
    description: "One of the largest domestic cat breeds, known for their gentle and friendly personality. They have magnificent long fur and tufted ears.",
    image: "https://placekitten.com/300/300?random=2" 
  },
  { 
    title: "Bengal", 
    description: "Wild-looking cats with distinctive spotted or marbled coats. They're highly active, intelligent, and love to climb and play.",
    image: "https://placekitten.com/300/300?random=3" 
  },
  { 
    title: "Persian", 
    description: "Luxurious long-haired cats with flat faces and calm temperaments. They prefer a quiet, serene environment and gentle handling.",
    image: "https://placekitten.com/300/300?random=4" 
  },
  { 
    title: "British Shorthair", 
    description: "Round-faced cats with plush, dense coats. They're known for their calm, easygoing nature and distinctive 'Cheshire Cat' smile.",
    image: "https://placekitten.com/300/300?random=5" 
  },
  { 
    title: "Ragdoll", 
    description: "Large, docile cats that go limp when picked up (hence the name). They have striking blue eyes and semi-long fur with colorpoint patterns.",
    image: "https://placekitten.com/300/300?random=6" 
  }
];

interface CatCardProps {
  title: string;
  description: string;
  image: string;
}

function CatCard({ title, description, image }: CatCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center max-w-sm">
      <div className="mb-4">
        <Image 
          src={image} 
          alt={title} 
          width={200} 
          height={200} 
          className="object-cover rounded-full mx-auto border-4 border-gray-100" 
        />
      </div>
      <h2 className="font-bold text-2xl text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-10 row-start-2 items-center">
        <h1 className="text-3xl font-bold">Explore Different Cat Breeds</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {catData.map((cat) => (
            <CatCard key={cat.title} {...cat} />
          ))}
        </div>
      </main>
    </div>
  );
}
