import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
`

export default function LandingPage() {
    return (
        <Container>
            <p>Please select a series from the sidebar.</p>
        </Container>
    )
}