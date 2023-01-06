import React from 'react';
import Link from '@docusaurus/Link';
import styled from '@emotion/styled';
import Layout from '@theme/Layout';

const Container = styled.div`
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    background-color: var(--ifm-color-primary);
    overflow: hidden;
`;

const Content = styled.div`
    color: #fff;
    width: 100%;
    text-align: center;
    position: relative;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
`;

const LinkStyled = styled(Link)`
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 20px;
    color: #000;
    cursor: pointer;
    display: inline-block;
    padding: 20px;
    font-size: 2rem;
`

const H1 = styled.h1`
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1.5rem;
`;

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Doc U`}
      description="Documentation de la factory U">
        <Container>
            <Content>
                <H1>Doc U</H1>
                <ButtonContainer>
                    <LinkStyled to="/docs/get-started">
                        Get Started
                    </LinkStyled>
                </ButtonContainer>
            </Content>
        </Container>
    </Layout>
  );
}
