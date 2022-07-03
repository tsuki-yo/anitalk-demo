import Image from 'next/image';
export default function AnimeDescription({ animeDoc}) {
  return (
      <>
        <Image src={`/${animeDoc.title}.jpg`} height={500} width={350} />
        <h1>Anime Description</h1>

        <h2>Title</h2>
        <p>{animeDoc.title}</p>

        <h2>Schedule</h2>
        <p>{animeDoc.schedule}</p>

        <h2>Story</h2>
        <p>{animeDoc.story}</p>

        <h2>Casts</h2>
        {Object.keys(animeDoc.casts).map((cast) => {
          return (
            <p key={cast}>{cast}: {animeDoc.casts[cast]}</p>
          )
        })}

        <h2>Staffs</h2>
        {Object.keys(animeDoc.staffs).map((staff) => {
          return (
            <p key={staff}>{staff}: {animeDoc.staffs[staff]}</p>
          )
        })}

        <h2>Official Links</h2>
        <a href={animeDoc.homeLink}>公式サイト</a>
        <br />
        <a href={animeDoc.twitterLink}>公式Twitter</a>
        
      </>
  )
}