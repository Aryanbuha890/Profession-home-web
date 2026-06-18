import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/startup/achievements')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/startup/achievements"!</div>
}
