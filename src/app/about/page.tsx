import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import { APP_METADATA } from '@/config/app.config'

export default function Page() {
    return (
        <PageWrapper>
            <div className="flex flex-col gap-2">
                <p className="font-bold">Contacts</p>
                <ul className="flex flex-col gap-0.5 text-sm text-discreet">
                    <li className="flex gap-2">
                        &#x2022; Twitter
                        <LinkWithIcon href={`https://x.com/${APP_METADATA.SOCIAL_TWITTER}`}>
                            <span>@{APP_METADATA.SOCIAL_TWITTER}</span>
                        </LinkWithIcon>
                    </li>
                    <li className="flex gap-2 text-discreet">
                        &#x2022; Telegram
                        <span className="text-secondary">@{APP_METADATA.TELEGRAM}</span>
                    </li>
                    <li className="flex gap-2 text-discreet">
                        &#x2022; Linkedin
                        <LinkWithIcon href={`https://www.linkedin.com/in/${APP_METADATA.LINKEDIN}`}>
                            <span>Profile</span>
                        </LinkWithIcon>
                    </li>
                </ul>
            </div>

            {/* https://dev.to/timreach/how-to-preview-a-nextjs-app-on-a-mobile-device-lf6 */}

            <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                    <p className="font-bold">Experience</p>
                    <p className="text-xs italic text-discreet">Not exhaustive</p>
                </div>
                <ul className="flex flex-col gap-5 text-discreet sm:gap-1">
                    <li className="flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <p className="font-bold text-secondary">Self</p>
                            <p className="text-sm">Dec 2024 - now</p>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <p className="font-bold text-secondary">Risk and DeFi Developer</p>
                            <p className="text-sm">Nov 2021 {'>'} Nov 2024</p>
                            <LinkWithIcon href="https://coinshares.com/">
                                <p className="text-sm">CoinShares</p>
                            </LinkWithIcon>
                        </div>
                        <p className="text-sm">
                            &#x2022; Coded apps used daily to monitor risk exposure (hedge funds, lending, staking) with max granularity
                        </p>
                        <p className="text-sm">&#x2022; Coded UIs used daily to monitor quantitative trading strategies</p>
                        <p className="text-sm">&#x2022; Run ethereum nodes (with secure access) + adhoch research</p>
                        <p className="text-sm">&#x2022; Shipped a DeFi dApp from scratch (hardhat, ethers, the Graph)</p>
                        <p className="text-sm">
                            &#x2022; Worked hard to improve CS frontend stack (opted for vite, tailwind, zustand - added eslint/prettier hooks)
                        </p>
                        <p className="text-sm">&#x2022; Left to focus on DeFi</p>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <p className="font-bold text-secondary">Full-Stack Developer</p>
                            <p className="text-sm">Jan 2021 {'>'} Oct 2021</p>
                            <LinkWithIcon href="https://stationf.co/">
                                <p className="text-sm">Station F</p>
                            </LinkWithIcon>
                        </div>
                        <p className="text-sm">&#x2022; Best practices to engineer + commit a clean code (unit, integration, e2e tests)</p>
                        <p className="text-sm">&#x2022; Left to work in crypto</p>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <p className="font-bold text-secondary">Transaction Services Intern</p>
                            <p className="text-sm">2017 ; 2019</p>
                            <LinkWithIcon href="https://www.grantthornton.fr/fr/secteurs/capital-investissement/">
                                <p className="text-sm">Grant Thornton</p>
                            </LinkWithIcon>
                        </div>
                        <p className="text-sm">&#x2022; Small & mid cap valuations in M&A context, waterfalls, statistical modelling</p>
                        <p className="text-sm">&#x2022; Memorandum, due diligences, litigation support</p>
                        <p className="text-sm">&#x2022; Left to pivot in tech</p>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-bold">Studies</p>
                <ul className="flex flex-col text-discreet">
                    <li className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="text-secondary">42</p>
                            <p className="text-sm">2020</p>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="text-secondary">DSCG</p>
                            <p className="text-sm">(= french CPA)</p>
                            <p className="text-sm">2019</p>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="text-secondary">Msc. Corporate Finance</p>
                            <p className="text-sm">2019</p>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="text-secondary">Le Wagon</p>
                            <p className="text-sm">2017</p>
                        </div>
                    </li>
                </ul>
            </div>
        </PageWrapper>
    )
}
