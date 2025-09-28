import VideoPlayer from '@/components/VideoPlayer';

const ScamStories = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-2">
      قصص نصب وتجارب حقيقية
    </h2>
    <div className="flex justify-center">
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" poster="/video-poster.jpg" className="max-w-[800px]" />
    </div>
  </section>
);

export default ScamStories;
