import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameById } from '../../features/games/hooks/useGameById';
import { useGameScreenshots } from '../../features/games/hooks/useGameScreenshots';
import { getUniquePlatforms } from '../../utils/getUniquePlatforms';
import { Button } from '../../components/ui/Button';
import { AuthModal } from '../../components/ui/AuthModal';
import { LibraryButton } from '../../components/ui/LibraryButton';
import { formatRequirements } from '../../utils/formatRequirements';
import { cleanDescription } from '../../utils/cleanDescription';
import { ArrowDownIcon } from '../../assets/icons/ArrowDownIcon';
import { ArrowUpIcon } from '../../assets/icons/ArrowUpIcon';
import { storeStyles } from '../../utils/storeSyles';

export function GameDetails() {
  const { id } = useParams();
  const gameId = Number(id);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
    return <div className='p-4 text-white'>Jogo não encontrado</div>;
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

  // APLICAÇÃO DA LIMPEZA DE TEXTO AQUI
  const finalDescription = cleanDescription(game.description);

  return (
    <div className='min-h-screen text-gray-100 pb-20'>
      {/* Hero Section */}
      <div
        className='relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center'
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent' />

        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto flex items-end gap-8'>
          <img
            src={game.background_image}
            alt={game.name}
            className='w-40 h-56 object-cover rounded-xl shadow-2xl hidden md:block border-2 border-white/10'
          />

          <div className='flex-1 mb-2'>
            <div className='flex gap-2 mb-4'>
              {game.metacritic && (
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold border ${
                    game.metacritic >= 75
                      ? 'border-green-500 text-green-400 bg-green-500/10'
                      : 'border-yellow-500 text-yellow-400'
                  }`}
                >
                  METASCORE {game.metacritic}
                </span>
              )}
            </div>

            <h1 className='text-4xl md:text-6xl font-black mb-4 tracking-tight leading-none text-white drop-shadow-lg'>
              {game.name}
            </h1>

            <div className='flex gap-4 items-center text-gray-300'>
              <div className='flex gap-3'>
                {platforms.map((platform) => (
                  <img
                    key={platform.family}
                    src={platform.image}
                    alt={platform.name}
                    className='w-6 h-6 opacity-80 hover:opacity-100 transition'
                    title={platform.name}
                  />
                ))}
              </div>
              <span className='text-gray-600'>|</span>
              <span>{game.released}</span>
              <span className='text-gray-600'>|</span>
              <span>{game.developers?.[0]?.name}</span>
            </div>
          </div>

          <LibraryButton
            game={game}
            className='hidden md:block'
            onLoggedOutClick={() => setIsAuthModalOpen(true)}
          />
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-4 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12'>
        <div className='lg:col-span-2 space-y-12'>
          {/* About Section */}
          <section>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
              <span className='w-1 h-6 bg-purple-500 rounded-full'></span>
              About
            </h2>
            <div className='bg-gray-800/30 p-6 rounded-xl border border-gray-700/30'>
              <div
                className={`text-gray-300 leading-relaxed space-y-4 text-lg transition-all duration-300 relative ${!isDescExpanded ? 'max-h-[300px] overflow-hidden mask-linear-gradient' : ''}`}
              >
                <div dangerouslySetInnerHTML={{ __html: finalDescription }} />

                {/* Gradiente Corrigido: Agora usando neutral-900 para ficar "preto" e não azulado */}
                {!isDescExpanded && (
                  <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent flex items-end justify-center'></div>
                )}
              </div>

              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className='mt-4 text-purple-400 hover:text-purple-300 font-bold uppercase text-sm tracking-wide flex items-center gap-2 mx-auto'
              >
                {isDescExpanded ? (
                  <>
                    Show Less <ArrowUpIcon />
                  </>
                ) : (
                  <>
                    Read More <ArrowDownIcon />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Media Section */}
          <section>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold flex items-center gap-2'>
                <span className='w-1 h-6 bg-purple-500 rounded-full'></span>
                Gallery
              </h2>
              {screenshots.length > 1 && (
                <div className='flex gap-2'>
                  <Button onClick={prevScreenshot} variant='icon' size='icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M15 18l-6-6 6-6' />
                    </svg>
                  </Button>
                  <Button variant='icon' size='icon' onClick={nextScreenshot}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M9 18l6-6-6-6' />
                    </svg>
                  </Button>
                </div>
              )}
            </div>

            {screenshots.length > 0 && (
              <div className='space-y-4'>
                <div className='relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-800'>
                  <img
                    src={screenshots[currentScreenshot]?.image}
                    alt='Screenshot'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur rounded-full text-xs font-bold'>
                    {currentScreenshot + 1} / {screenshots.length}
                  </div>
                </div>

                <div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
                  {screenshots.map((shot, index) => (
                    <button
                      key={shot.id}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`relative flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden transition-all ${
                        index === currentScreenshot
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900 opacity-100'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={shot.image} alt='' className='w-full h-full object-cover' />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* System Requirements (PC) */}
          {pcRequirements && (pcRequirements.minimum || pcRequirements.recommended) && (
            <section>
              <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                <span className='w-1 h-6 bg-purple-500 rounded-full'></span>
                System Requirements (PC)
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {pcRequirements.minimum && (
                  <div className='bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition duration-300'>
                    <h3 className='text-purple-400 font-bold mb-4 uppercase text-sm tracking-wider border-b border-gray-700 pb-2'>
                      Minimum
                    </h3>
                    <div
                      className='text-sm text-gray-300 space-y-2 leading-relaxed'
                      dangerouslySetInnerHTML={{
                        __html: formatRequirements(pcRequirements.minimum) || '',
                      }}
                    />
                  </div>
                )}
                {pcRequirements.recommended && (
                  <div className='bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition duration-300'>
                    <h3 className='text-green-400 font-bold mb-4 uppercase text-sm tracking-wider border-b border-gray-700 pb-2'>
                      Recommended
                    </h3>
                    <div
                      className='text-sm text-gray-300 space-y-2 leading-relaxed'
                      dangerouslySetInnerHTML={{
                        __html: formatRequirements(pcRequirements.recommended) || '',
                      }}
                    />
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className='space-y-8'>
          <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 grid grid-cols-2 gap-6'>
            <div>
              <p className='text-gray-500 text-xs uppercase font-bold mb-1'>Rating</p>
              <p className='text-2xl font-bold text-white flex items-center gap-1'>
                {game.rating} <span className='text-gray-600 text-lg'>/ 5</span>
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-xs uppercase font-bold mb-1'>Playtime</p>
              <p className='text-2xl font-bold text-white'>
                {game.playtime} <span className='text-sm text-gray-500 font-normal'>hours</span>
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-xs uppercase font-bold mb-1'>Age Rating</p>
              <p className='text-lg font-bold text-white'>
                {game.esrb_rating?.name || 'Not Rated'}
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-xs uppercase font-bold mb-1'>Release</p>
              <p className='text-lg font-bold text-white'>{game.released}</p>
            </div>
          </div>

          <div>
            <h3 className='text-gray-400 font-bold mb-3 uppercase text-sm'>Genres</h3>
            <div className='flex flex-wrap gap-2'>
              {game.genres.map((g) => (
                <span
                  key={g.id}
                  className='px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition cursor-default border border-gray-700'
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {game.tags && (
            <div>
              <h3 className='text-gray-400 font-bold mb-3 uppercase text-sm'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {game.tags.slice(0, 15).map((t) => (
                  <span
                    key={t.id}
                    className='px-2 py-1 text-xs text-gray-400 bg-gray-800/50 rounded'
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.stores && game.stores.length > 0 && (
            <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
              <h3 className='text-gray-400 font-bold mb-3 uppercase text-sm flex items-center gap-2'>
                Where to Buy
              </h3>
              <div className='grid grid-cols-1 gap-2'>
                {game.stores.map((s) => {
                  const specificStyle =
                    storeStyles[s.store.name] || 'hover:bg-gray-700 hover:border-gray-500';

                  return (
                    <a
                      key={s.id}
                      href={`https://${s.store.domain}`}
                      target='_blank'
                      rel='noreferrer'
                      className={`flex items-center justify-between px-4 py-3 bg-gray-800 border border-transparent rounded-lg transition-all duration-300 group ${specificStyle}`}
                    >
                      <span className='font-medium text-gray-300 group-hover:text-current transition-colors flex items-center gap-2'>
                        {s.store.name}
                      </span>

                      <span className='text-gray-600 group-hover:text-current opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                          <polyline points='15 3 21 3 21 9'></polyline>
                          <line x1='10' y1='14' x2='21' y2='3'></line>
                        </svg>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-900/90 backdrop-blur border-t border-gray-800 z-50'>
        <LibraryButton
          game={game}
          className='w-full'
          onLoggedOutClick={() => setIsAuthModalOpen(true)}
        />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
