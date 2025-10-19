// Small card wrapper (optional; Projects grid uses FeaturedGrid.Card directly)
import FeaturedGrid from './FeaturedGrid.jsx'
export default function ProjectCard({ item }) {
  return <FeaturedGrid.Card item={item} compact />
}
