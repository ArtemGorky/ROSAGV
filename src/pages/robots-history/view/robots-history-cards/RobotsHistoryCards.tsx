import { Card, Descriptions, Image, Typography, DescriptionsProps, Button } from "antd";

import styles from "./RobotsHistoryCards.module.css";

const { Title } = Typography;

const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: "Робот",
        children: "232",
    },
    {
        key: '2',
        label: "Дата",
        children: "11.10.24 12:46",
    },
    {
        key: '3',
        label: "В04075501 от  30.09.2024",
        children: "rest08",
    },
    {
        key: '4',
        label: "Задача",
        children: "Движение до точки отдыха",
    },
    {
        key: '5',
        label: "Точка РМС",
        children: "GT50entrance",
    }
];


export const RobotsHistoryCards = () => {
    return (
        <div className={styles.cardsContainer}>
            {
                cards.map((_: string, index: number) => {
                    return <div key={index} className={styles.cardContainer}>
                        <Card>
                            <Title level={4}>Переведен в ручной режим</Title>
                            <Descriptions
                                contentStyle={{ justifyContent: "end" }}
                                className={styles.descriptions}
                                column={1}
                                items={items}
                            />
                            {/* <div className={styles.historyBlock}>
                                <span>Робот: 232</span>
                                <span>11.10.24 12:46</span>
                            </div>
                            <div className={styles.historyBlock}>
                                <span>В04075501 от  30.09.2024 - -rest08</span>
                            </div>
                            <div className={styles.historyBlock}>
                                <span>Задача: Движение до точки отдыха</span>
                            </div>
                            <div className={styles.historyBlock}>
                                <span>Точка РМС: GT50entrance</span>
                            </div> */}
                            <div className={styles.imgBlock}>
                                <Image className={styles.img} src={"/img/img_01.png"} />
                                <Image className={styles.img} src={"/img/img_02.png"} />
                                <Image className={styles.img} src={"/img/img_03.png"} />
                            </div>
                            <Button type={"primary"}>Установить тег</Button>
                        </Card>
                    </div>
                })

            }
        </div>
    )
}