import { motion } from "framer-motion"
import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import styled from "styled-components"
import Card, { CardContent } from "../components/Card"

export interface PlayerRankCardProps {
  player: any
  rank: number
}

export default function PlayerRankCard({ player, rank }: PlayerRankCardProps) {
  return (
    <motion.div className="player" whileHover={{ scale: 1.05 }}>
      <PlayerLink to={`/player/${player.childrenPlayer[0].id}`}>
        <PlayerCard>
          <div className="rank">{rank}</div>
          <Headshot
            fixed={player.childrenPlayer[0].headshotImage.childImageSharp.fixed}
            alt={player.fullname}
            critical
          />

          <CardContent>
            <h2 className="name">{player.childrenPlayer[0].fullName}</h2>
            <h3 className="points">
              <span className="points-number">{player.stat.points}</span> pts
            </h3>
          </CardContent>
        </PlayerCard>
      </PlayerLink>
    </motion.div>
  )
}

const PlayerLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const PlayerCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  img {
    border-radius: 5px;
  }

  .points,
  .name {
    font-size: 1.2em;
    font-weight: 500;
  }

  .points-number {
    font-size: 2em;
  }

  .rank {
    position: absolute;
    left: ${props => props.theme.spacing()};
    top: ${props => props.theme.spacing()};
    z-index: 2;
    font-weight: 700;
  }
`

const Headshot = styled(Img)`
  width: 100% !important;
  max-width: 168px;
`
