import { useNavigate } from 'react-router-dom';
import { useGames } from '../../features/games/hooks/useGames';
import type { Platform } from '../../features/games/types';

const platformConfig: Record<string, { family: string; image: string }> = {
  playstation5: { family: 'playstation', image: 'src/assets/playstation.png' },
  playstation4: { family: 'playstation', image: 'src/assets/playstation.png' },
  playstation3: { family: 'playstation', image: 'src/assets/playstation.png' },
  'xbox-series-x': { family: 'xbox', image: 'src/assets/xbox.png' },
  'xbox-one': { family: 'xbox', image: 'src/assets/xbox.png' },
  xbox360: { family: 'xbox', image: 'src/assets/xbox.png' },
  'nintendo-switch': { family: 'nintendo', image: 'src/assets/nintendo.png' },
  pc: { family: 'pc', image: 'src/assets/windows.png' },
  macos: { family: 'macos', image: 'src/assets/macos.png' },
};

const getUniquePlatforms = (platforms: { platform: Platform }[]) => {
  const seen = new Set<string>();
  const result: { family: string; image: string; name: string }[] = [];

  for (const p of platforms) {
    const config = platformConfig[p.platform.slug];
    if (config && !seen.has(config.family)) {
      seen.add(config.family);
      result.push({ family: config.family, image: config.image, name: p.platform.name });
    }
  }

  return result;
};

export function Home() {
  const navigate = useNavigate();
  const { data } = useGames();
  return (
    <div>
      <div className='w-full flex'>
        <div className='w-[10%] p-10'>
          <h2 className='mb-2 font-bold'>Sort By</h2>
          <p>Popularity</p>
          <p>Release Date</p>

          <h2 className='my-2 font-bold'>Platforms</h2>
          <p>PC</p>
          <p>Playstation</p>
          <p>Xbox</p>
          <p>Nintendo</p>

          <h2 className='my-2 font-bold'>Genres</h2>
          <p>Action</p>
          <p>RPG</p>
          <p>Indie</p>
        </div>
        <div className='border border-neutral-800' />
        <div className='w-[90%] p-10'>
          <div className='grid grid-cols-5 gap-4'>
            {data?.results.map((game) => (
              <div key={game.id} className='relative h-72'>
                <div
                  onClick={() => navigate(`/game/${game.id}`)}
                  className='group absolute inset-x-0 top-0 flex flex-col bg-neutral-700 rounded-xl cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:z-20 hover:shadow-xl hover:shadow-black/50'
                >
                  <div
                    className='h-48 relative rounded-t-xl bg-cover bg-center'
                    style={{ backgroundImage: `url(${game.background_image})` }}
                  >
                    {game.metacritic && (
                      <div className='w-10 m-2 flex rounded-lg justify-center absolute right-0 p-2 bg-lime-600'>
                        <p>{game.metacritic}</p>
                      </div>
                    )}
                  </div>
                  <div className='p-3 flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      {getUniquePlatforms(game.platforms).map((platform) => (
                        <img
                          key={platform.family}
                          className='w-4 h-4'
                          src={platform.image}
                          alt={platform.name}
                        />
                      ))}
                    </div>
                    <p className='font-semibold truncate group-hover:whitespace-normal'>
                      {game.name}
                    </p>

                    {/* Conteúdo expandido no hover */}
                    <div className='max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-40'>
                      <div className='pt-2 border-t border-neutral-600 space-y-1 text-sm text-neutral-300'>
                        <p>
                          <span className='text-neutral-400'>Lançamento:</span> {game.released}
                        </p>
                        <p>
                          <span className='text-neutral-400'>Média de duração:</span>{' '}
                          {game.playtime} horas
                        </p>
                        <p>
                          <span className='text-neutral-400'>Gêneros:</span>{' '}
                          {game.genres.map((g) => g.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
