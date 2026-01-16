import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameById } from '../../features/games/hooks/useGameById';
import { useGameScreenshots } from '../../features/games/hooks/useGameScreenshots';
import { getUniquePlatforms } from '../../utils/getUniquePlatforms';

export function GameDetails() {
  const { id } = useParams();
  const gameId = Number(id);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const { data: game, isLoading: isLoadingGame } = useGameById(gameId);
  const { data: screenshotsData, isLoading: isLoadingScreenshots } = useGameScreenshots(gameId);

  if (isLoadingGame || isLoadingScreenshots) {
    return (
      <div className='flex justify-center py-12'>
        <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!game) {
    return <div className='p-4'>Jogo não encontrado</div>;
  }

  const screenshots = screenshotsData?.results ?? [];
  const platforms = getUniquePlatforms(game.parent_platforms);
  const pcRequirements = game.platforms.find((p) => p.platform.slug === 'pc')?.requirements;

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div
        className='relative w-full h-100 bg-cover bg-center'
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent' />

        <div className='absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6'>
          {/* Thumbnail */}
          <img
            src={game.background_image}
            alt={game.name}
            className='w-32 h-44 object-cover rounded-lg shadow-xl hidden md:block'
          />

          {/* Title */}
          <div className='flex-1'>
            <h1 className='text-4xl md:text-5xl font-bold mb-2'>{game.name}</h1>
            <div className='flex gap-2 items-center'>
              {platforms.map((platform) => (
                <img
                  key={platform.family}
                  src={platform.image}
                  alt={platform.name}
                  className='w-5 h-5'
                />
              ))}
              {game.metacritic && (
                <span className='ml-4 px-3 py-1 bg-lime-600 rounded-lg font-bold text-sm'>
                  {game.metacritic}
                </span>
              )}
            </div>
          </div>

          {/* Add to Library Button */}
          <button className='hidden md:flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M12 5v14M5 12h14' />
            </svg>
            Add to Library
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Left Column */}
        <div className='space-y-8'>
          {/* About Section */}
          <section>
            <h2 className='text-2xl font-bold mb-4'>About</h2>
            <p className='text-neutral-300 leading-relaxed'>
              {game.description_raw || 'No description available.'}
            </p>

            {/* Info Grid */}
            <div className='grid grid-cols-3 gap-4 mt-6'>
              <div>
                <p className='text-neutral-500 text-sm'>Release Date</p>
                <p className='font-semibold'>{game.released || 'TBA'}</p>
              </div>
              <div>
                <p className='text-neutral-500 text-sm'>Platforms</p>
                <p className='font-semibold'>
                  {game.platforms.map((p) => p.platform.name).join(', ')}
                </p>
              </div>
              <div>
                <p className='text-neutral-500 text-sm'>Developer</p>
                <p className='font-semibold'>
                  {game.developers?.map((d) => d.name).join(', ') || 'Unknown'}
                </p>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section>
            <h2 className='text-2xl font-bold mb-4'>Details</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-neutral-500 text-sm'>Genres</p>
                <p className='font-semibold'>{game.genres.map((g) => g.name).join(', ')}</p>
              </div>
              <div>
                <p className='text-neutral-500 text-sm'>Publisher</p>
                <p className='font-semibold'>
                  {game.publishers?.map((p) => p.name).join(', ') || 'Unknown'}
                </p>
              </div>
              <div>
                <p className='text-neutral-500 text-sm'>Rating</p>
                <p className='font-semibold'>{game.rating}/5</p>
              </div>
              <div>
                <p className='text-neutral-500 text-sm'>Playtime</p>
                <p className='font-semibold'>{game.playtime} hours</p>
              </div>
              {game.esrb_rating && (
                <div>
                  <p className='text-neutral-500 text-sm'>Age Rating</p>
                  <p className='font-semibold'>{game.esrb_rating.name}</p>
                </div>
              )}
              {game.achievements_count > 0 && (
                <div>
                  <p className='text-neutral-500 text-sm'>Achievements</p>
                  <p className='font-semibold'>{game.achievements_count}</p>
                </div>
              )}
            </div>
          </section>

          {/* Metacritic by Platform */}
          {game.metacritic_platforms && game.metacritic_platforms.length > 0 && (
            <section>
              <h2 className='text-2xl font-bold mb-4'>Metacritic Scores</h2>
              <div className='flex flex-wrap gap-3'>
                {game.metacritic_platforms.map((mp) => (
                  <a
                    key={mp.platform.slug}
                    href={mp.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors'
                  >
                    <span
                      className={`px-2 py-1 rounded font-bold text-sm ${
                        mp.metascore >= 75
                          ? 'bg-lime-600'
                          : mp.metascore >= 50
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                      }`}
                    >
                      {mp.metascore}
                    </span>
                    <span className='text-sm'>{mp.platform.name}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Community & Links */}
          <section>
            <h2 className='text-2xl font-bold mb-4'>Community</h2>
            <div className='flex flex-wrap gap-3'>
              {game.website && (
                <a
                  href={game.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <circle cx='12' cy='12' r='10' />
                    <path d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                  </svg>
                  <span className='text-sm'>Website</span>
                </a>
              )}
              {game.reddit_url && (
                <a
                  href={game.reddit_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z' />
                  </svg>
                  <span className='text-sm'>Reddit</span>
                  {game.reddit_count > 0 && (
                    <span className='text-xs text-orange-300'>({game.reddit_count})</span>
                  )}
                </a>
              )}
              {game.youtube_count > 0 && (
                <div className='flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                  </svg>
                  <span className='text-sm'>YouTube</span>
                  <span className='text-xs text-red-300'>
                    ({game.youtube_count.toLocaleString()})
                  </span>
                </div>
              )}
              {game.twitch_count > 0 && (
                <div className='flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' />
                  </svg>
                  <span className='text-sm'>Twitch</span>
                  <span className='text-xs text-purple-300'>({game.twitch_count})</span>
                </div>
              )}
            </div>
          </section>

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <section>
              <h2 className='text-2xl font-bold mb-4'>Tags</h2>
              <div className='flex flex-wrap gap-2'>
                {game.tags.slice(0, 12).map((tag) => (
                  <span
                    key={tag.id}
                    className='px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300'
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className='space-y-8'>
          {/* Media Section */}
          <section>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-2xl font-bold'>Media</h2>
              {screenshots.length > 1 && (
                <div className='flex gap-2'>
                  <button
                    onClick={prevScreenshot}
                    className='p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M15 18l-6-6 6-6' />
                    </svg>
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className='p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M9 18l6-6-6-6' />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Main Screenshot */}
            {screenshots.length > 0 && (
              <div className='relative'>
                <img
                  src={screenshots[currentScreenshot]?.image}
                  alt='Screenshot'
                  className='w-full h-64 object-cover rounded-xl'
                />
                <div className='absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-sm'>
                  {currentScreenshot + 1} / {screenshots.length}
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            <div className='flex gap-2 mt-4 overflow-x-auto pb-2'>
              {screenshots.slice(0, 6).map((shot, index) => (
                <img
                  key={shot.id}
                  src={shot.image}
                  alt='Screenshot thumbnail'
                  onClick={() => setCurrentScreenshot(index)}
                  className={`w-24 h-16 object-cover rounded-lg cursor-pointer transition-all ${
                    index === currentScreenshot
                      ? 'ring-2 ring-purple-500'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* System Requirements Section */}
          {pcRequirements && (pcRequirements.minimum || pcRequirements.recommended) && (
            <section>
              <h2 className='text-2xl font-bold mb-4'>System Requirements</h2>
              <div className='bg-neutral-800 rounded-xl p-4 space-y-4'>
                {pcRequirements.minimum && (
                  <div>
                    <h3 className='font-semibold text-neutral-400 mb-2'>Minimum</h3>
                    <p
                      className='text-sm text-neutral-300 whitespace-pre-line'
                      dangerouslySetInnerHTML={{
                        __html: pcRequirements.minimum.replace(/<br\s*\/?>/gi, '\n'),
                      }}
                    />
                  </div>
                )}
                {pcRequirements.recommended && (
                  <div>
                    <h3 className='font-semibold text-neutral-400 mb-2'>Recommended</h3>
                    <p
                      className='text-sm text-neutral-300 whitespace-pre-line'
                      dangerouslySetInnerHTML={{
                        __html: pcRequirements.recommended.replace(/<br\s*\/?>/gi, '\n'),
                      }}
                    />
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile Add to Library Button */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 p-4 bg-neutral-900 border-t border-neutral-800'>
        <button className='w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
          Add to Library
        </button>
      </div>
    </div>
  );
}
