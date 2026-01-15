export function Home() {
  const mock = [
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
  ];
  return (
    <div>
      <h2 className='text-xl'>Welcome to Discovery</h2>
      <div className='w-full flex mt-6'>
        <div className='w-1/4'>
          <h2>Platforms</h2>
          <p>PC</p>
          <p>Playstation</p>
          <p>Xbox</p>
          <p>Nintendo</p>

          <h2>Genres</h2>
          <p>Action</p>
          <p>RPG</p>
          <p>Indie</p>
        </div>
        <div className='w-3/4'>
          {mock.map((game) => {
            return (
              <div>
                <p>{game.title}</p>
                <p>{game.picture}</p>
                <p>{game.rating}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
